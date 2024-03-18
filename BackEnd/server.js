let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

const app = express();
const PORT = process.env.PORT || 7500;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/User', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/login', async (req, res) => {
  const { username } = req.body;
  try 
  {
    const user = await User.findOne({ username });

    if (user) 
    {
      res.status(200).json({
        message: 'User found',
      });
    } 

    else 
    {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});