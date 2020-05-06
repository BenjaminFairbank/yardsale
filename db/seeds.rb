# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user_1 = User.create(user_name: "MrHello", zip_code: "02138", email: "MrHello@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_2 = User.create(user_name: "MrGoodbye", zip_code: "02155", email: "MrGoodbye@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_3 = User.create(user_name: "TheSandMan", zip_code: "02124", email: "TheSandMan@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_4 = User.create(user_name: "BigBird", zip_code: "02102", email: "BigBird@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_5 = User.create(user_name: "PoshSpice", zip_code: "02450", email: "PoshSpice@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_6 = User.create(user_name: "MrHat", zip_code: "98382", email: "MrHat@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_7 = User.create(user_name: "MichaelJordan", zip_code: "02164", email: "MichaelJordan@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_8 = User.create(user_name: "Lostchild6789", zip_code: "02157", email: "Lostchild6789@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_9 = User.create(user_name: "SoulMan", zip_code: "02109", email: "SoulMan@gmail.com", password: "mrhello", password_confirmation: "mrhello")
user_10 = User.create(user_name: "RickyBobby", zip_code: "02634", email: "RickyBobby@gmail.com", password: "mrhello", password_confirmation: "mrhello")



item_1 = Item.create(name: "First Item", description: "please buy me!", image: "https://logodix.com/logo/1868193.jpg", asking_price: 2000, zip_code: "02138", user: user_1)
item_2 = Item.create(name: "Second Item", description: "please buy me next!", asking_price: 3000, zip_code: "02138", user: user_1)
item_3 = Item.create(name: "Third Item", description: "the best items have long long descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 1569, zip_code: "02138", user: user_1)
item_4 = Item.create(name: "Fourth Item", description: "the best items have long long loooooooong descriptionsthe best items have long long loooooooong descriptionsthe best items have long long loooooooong descriptionsthe best items have long long loooooooong descriptionsthe best items have long long loooooooong descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 0, zip_code: "02138", user: user_1)

item_11 = Item.create(name: "First Item2", description: "please buy me!", image: "https://logodix.com/logo/1868193.jpg", asking_price: 2000, zip_code: "02155", user: user_2)
item_12 = Item.create(name: "Second Item2", description: "please buy me next!", asking_price: 3000, zip_code: "02155", user: user_2)
item_13 = Item.create(name: "Third Item2", description: "the best items have long long descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 1569, zip_code: "02155", user: user_2)
item_14 = Item.create(name: "Fourth Item2", description: "the best items have long long loooooooong descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 0, zip_code: "02155", user: user_2)

item_21 = Item.create(name: "First Item3", description: "please buy me!", image: "https://logodix.com/logo/1868193.jpg", asking_price: 2000, zip_code: "02124", user: user_3)
item_22 = Item.create(name: "Second Item3", description: "please buy me next!", asking_price: 3000, zip_code: "02124", user: user_3)
item_23 = Item.create(name: "Third Item3", description: "the best items have long long descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 1569, zip_code: "02124", user: user_3)
item_24 = Item.create(name: "Fourth Item3", description: "the best items have long long loooooooong descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 0, zip_code: "02124", user: user_3)

item_31 = Item.create(name: "First Item4", description: "please buy me!", image: "https://logodix.com/logo/1868193.jpg", asking_price: 2000, zip_code: "02102", user: user_4)
item_32 = Item.create(name: "Second Item4", description: "please buy me next!", asking_price: 3000, zip_code: "02102", user: user_4)
item_33 = Item.create(name: "Third Item4", description: "the best items have long long descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 1569, zip_code: "02102", user: user_4)
item_34 = Item.create(name: "Fourth Item4", description: "the best items have long long loooooooong descriptions", image: "https://logodix.com/logo/1868193.jpg", asking_price: 0, zip_code: "02102", user: user_4)
