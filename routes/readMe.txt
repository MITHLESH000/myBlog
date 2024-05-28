routes folder is used to creates the server.js file routers



// Route to update user data
app.put('/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('Duplicate field value entered');
        }
        res.status(500).send('Error updating user');
    }
});




json user update
{
  "_id": "6653d2222141feb434d57308",
  "username": "ram",
  "password": "$2a$10$c72/pmHJ2UcGt.6UZjf8n.CqTL6nJo6GiYNJvZhGAXjJnY9gWSxgS",
  "email": "ram@gmail.com",
  "image": "",
  "__v": 0
}