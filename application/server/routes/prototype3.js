const express = require('express');
const router = express.Router();
const db = require('../conf/database');
const path = require('path');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get(`/search`, async(req, res)=>{
    const query = `SELECT * FROM restaurants `;
    const {search} = req.query;
    console.log(search)
    try{
        if(search == null){
          var [rows, fields] = await db.query(`SELECT id, name, cuisine, status FROM restaurants WHERE status>0`, []);
          res.status(200).json(rows);
        }else{
          var [rows, fields] = await db.query(`SELECT id, name, cuisine, status, concat_ws(' ', name, cuisine, status) as haystack FROM restaurants having haystack like ?;`, [`%${search}%`]);
          res.status(200).json(rows);
        }
    }catch(error){
      res.status(400);
    }
  });

  router.get('/searchUser', async (req, res) => {
    const { username, password } = req.query;
  
    // Check if the username in the session matches the requested 'username'
    if (username !== req.session.user.username) {
      return res.status(400).json({ message: "It is not your page" });
    }
  
    try {
      const [rows, fields] = await db.query(
        'SELECT * FROM customers WHERE username = ? AND password = ?;',
        [username, password]
      );
      if (rows.length > 0) {
        const user = rows[0];
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'No customer found with that username and password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  router.get('/getUserProfile', async (req, res) => {
    const { username } = req.query;
    try {
      const customerId = await getCustomerIdByUsername(username);
  
      if (customerId === null) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      //  information on the customer ID from the database
      const userProfile = await getUserProfile(customerId);
  
      if (userProfile) {
        res.status(200).json(userProfile);
      } else {
        res.status(404).json({ error: 'User profile not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  async function getUserProfile(customerId) {
    try {
      const [profile] = await db.query('SELECT * FROM customers WHERE id = ?', [customerId]);
  
      if (profile && profile.length > 0) {
        return profile[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  async function updateCustomerBio(customerId, bio) {
    try {
      if (bio) {
        const [result] = await db.query(
          'UPDATE customers SET bio = ?, updated_at = NOW() WHERE id = ?;',
          [bio, customerId]
        );
  
        if (result.affectedRows > 0) {
          const updatedTime = new Date().toLocaleString(); // Get the current timestamp
  
          return { message: 'Bio updated successfully' };
        } else {
          return { error: 'Customer not found' };
        }
      } else {
        return { error: 'Missing bio parameter' };
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async function getCustomerIdByUsername(username) {
    try {
      const [customer] = await db.query(
        'SELECT id FROM customers WHERE username = ?',
        [username]
      );
  
      if (customer && customer.length > 0) {
        return customer[0].id;
      } else {
        return null; // Return null if the username is not found
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
   
// updateCustomerBio(1, 'lalala');
  

router.post('/updateBio', async (req, res) => {
  const { customerId, bio } = req.body;

  try {
    if (bio) {
      const result = await updateCustomerBio(customerId, bio);
      if (result.error) {
        res.status(400).json(result); // Return error response if update fails
      } else {
        res.status(200).json(result); // Return success response if update is successful
      }
    } else {
      res.status(400).json({ error: 'Missing bio parameter' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/updateEmail', async (req, res) => {
  const { customerId, newEmail } = req.body;

  try {
    const result = await updateCustomerEmail(customerId, newEmail);
    if (result.error) {
      res.status(400).json(result); // Return error response if update fails
    } else {
      res.status(200).json(result); // Return success response if update is successful
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

async function updateCustomerEmail(customerId, newEmail) {
  try {
    if (!newEmail) {
      return { error: 'Missing new email parameter' };
    }

    // Check if another customer already has the new email
    const [emailCheckResult] = await db.query(
      'SELECT id FROM customers WHERE email = ? AND id <> ?',
      [newEmail, customerId]
    );

    if (emailCheckResult.length > 0) {
      return { error: 'Email is already in use by another customer' };
    }

    const [result] = await db.query(
      'UPDATE customers SET email = ? WHERE id = ?',
      [newEmail, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Email updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

// updateCustomerEmail(1, "leslie@example.com")

router.post('/updateName', async (req, res) => {
  const { customerId, newName } = req.body;

  try {
    const nameUpdateResult = await updateCustomerName(customerId, newName);
    if (nameUpdateResult.error) {
      res.status(400).json(nameUpdateResult); // Return error response if update fails
    } else {
      res.status(200).json(nameUpdateResult); // Return success response if update is successful
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


async function updateCustomerName(customerId, newName) {
  try {

    const [result] = await db.query(
      'UPDATE customers SET firstname = ? WHERE id = ?',
      [newName, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Name updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
// updateCustomerName(1, "Luis")

router.post('/updateLastName', async (req, res) => {
  const { customerId, newLastName } = req.body;

  try {
    const lastNameUpdateResult = await updateCustomerLastName(customerId, newLastName);
    if (lastNameUpdateResult.error) {
      res.status(400).json(lastNameUpdateResult); // Return error response if update fails
    } else {
      res.status(200).json(lastNameUpdateResult); // Return success response if update is successful
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


async function updateCustomerLastName(customerId, newLastName) {
  try {
    const [result] = await db.query(
      'UPDATE customers SET lastname = ? WHERE id = ?',
      [newLastName, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Last name updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

// updateCustomerLastName(1, "a")


async function updateCustomerPhoneNumber(customerId, phoneNumber) {
  try {
    const [result] = await db.query(
      'UPDATE customers SET phone = ? WHERE id = ?',
      [phoneNumber, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Phone number updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// router.post('/updatePhoneNumber', async (req, res) => {
//   const { customerId, newPhoneNumber } = req.body;

//   try {
//     const phoneNumberUpdateResult = await updateCustomerPhoneNumber(customerId, newPhoneNumber);
//     res.status(200).json(phoneNumberUpdateResult);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });


router.post('/updatePhoneNumber', async (req, res) => {
  const { customerId, newPhoneNumber } = req.body;

  try {
    const phoneNumberUpdateResult = await updateCustomerPhoneNumber(customerId, newPhoneNumber);
    if (phoneNumberUpdateResult.error) {
      res.status(400).json(phoneNumberUpdateResult); // Return error response if update fails
    } else {
      res.status(200).json(phoneNumberUpdateResult); // Return success response if update is successful
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// updateCustomerPhoneNumber(1, "4dddddd15415")

// async function updateCustomerImage(customerId, newImagePath) {
//   try {
//     // Check if a new image path is provided, and if not, set it to null
//     const imagePath = newImagePath || null;

//     const [result] = await db.query(
//       'UPDATE customers SET image_path = ? WHERE id = ?',
//       [imagePath, customerId]
//     );

//     if (result.affectedRows > 0) {
//       console.log('Image path updated successfully');
//       console.log('Customer ID:', customerId);
//       console.log('New Image Path:', imagePath);
//     } else {
//       console.log({ error: 'Customer not found' });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

router.post('/edit', async (req, res) => {
  const { username, email, bio, newEmail, newName, newLastName, newPhoneNumber } = req.body;

  try {
    const customerId = await getCustomerIdByUsername(username);

    if (customerId === null) {
      res.status(400).json({ error: 'Customer not found' });
      return;
    }

    // Fetch the user's profile data
    const userProfile = await getUserProfile(customerId);

    // Update the user's data based on the provided fields
    const updateResults = {};

    if (email) {
      const emailUpdateResult = await updateCustomerEmail(customerId, newEmail);
      updateResults.email = emailUpdateResult;
    }

    if (bio) {
      const bioUpdateResult = await updateCustomerBio(customerId, bio);
      updateResults.bio = bioUpdateResult;
    }

    if (newName) {
      const nameUpdateResult = await updateCustomerName(customerId, newName);
      updateResults.name = nameUpdateResult;
    }

    if (newLastName) {
      const lastNameUpdateResult = await updateCustomerLastName(customerId, newLastName);
      updateResults.lastName = lastNameUpdateResult;
    }

    if (newPhoneNumber) {
      const phoneNumberUpdateResult = await updateCustomerPhoneNumber(customerId, newPhoneNumber);
      updateResults.phoneNumber = phoneNumberUpdateResult;
    }

    // Merge the user profile data with the update results
    const updatedUserProfile = { ...userProfile, ...updateResults };

    res.status(200).json(updatedUserProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


  module.exports = router;