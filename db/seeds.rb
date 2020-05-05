# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user_1 = User.create(user_name: "MrHello", email: "MrHello@gmail.com", password: "mrhello", password_confirmation: "mrhello")

item_1 = Item.create(name: "First item", description: "please buy me!", image: "https://logodix.com/logo/1868193.jpg", asking_price: 2000, area_code: "02138", user: user_1)
item_2 = Item.create(name: "Second item", description: "please buy me next!", asking_price: 3000, area_code: "02155", user: user_1)
