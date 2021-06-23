# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
images = Image.create([
  {
    name: "Cafe",
    image_url: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "A brand new cafe named CCD"
  },
  {
    name: "Book",
    image_url: "https://images.pexels.com/photos/3981646/pexels-photo-3981646.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "A book with a good quote"
  },
  {
    name: "School",
    image_url: "https://images.pexels.com/photos/5212333/pexels-photo-5212333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description: "A class room with childerns"
  }
])