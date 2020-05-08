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



item_1 = Item.create(name: "Reid's Boat", description: "I am also looking for a new place to stay, if you know of anything let me know", image: "https://d2qh54gyqi6t5f.cloudfront.net/boat_images/7/7933/7933209/carousel_bayliner-ltd-ciera-8-for-sale-farndon-marina-united-kingdom-001.jpg", asking_price: 10585000, zip_code: "02138", user: user_1)
item_2 = Item.create(name: "Old clock", description: "Looks and works like new. it's almost as if time has stood still?", image: "https://images-na.ssl-images-amazon.com/images/I/81F8KGuJJ0L._AC_SX522_.jpg", asking_price: 10000, zip_code: "02138", user: user_1)
item_3 = Item.create(name: "Rock", description: "it's a rock.", image: "https://www.washingtonpost.com/resizer/HKVh1BkgYvDMo3Qer9hwWbXi5Lk=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/56TOGNJAFNANBKFFGYSAHQQ4TU.jpg", asking_price: 0, zip_code: "02138", user: user_1)
item_4 = Item.create(name: "Dewalt Circular Saw", description: "The best tool I ever saw.", image: "https://img.letgo.com/images/e5/d6/6f/87/e5d66f87d811a2d43a146d2c6afe3e18.jpeg?impolicy=img_600", asking_price: 2000, zip_code: "02138", user: user_1)

item_11 = Item.create(name: "First Item2", description: "please buy me!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrOiUqo7Vs6mL-xagFkWdK2B0ASyPlRe5v1jFe9KqjL61CbyU8&usqp=CAU", asking_price: 2000, zip_code: "02155", user: user_2)
item_12 = Item.create(name: "Second Item2", description: "please buy me next!", image:"https://www.nbsmokehouse.com/content/products-sq/162-full.jpg", asking_price: 3000, zip_code: "02155", user: user_2)
item_13 = Item.create(name: "Third Item2", description: "the best items have long long descriptions", image: "https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dwba2185ca/Images/Product%20Images/prod000631/prod000631.jpg?sw=320&sh=378&sm=fit", asking_price: 1569, zip_code: "02155", user: user_2)
item_14 = Item.create(name: "Fourth Item2", description: "the best items have long long loooooooong descriptions", image: "https://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Swiss_Slices_36762caf-0757-45d2-91f0-424bcacc9892_grande.jpg?v=1534871055", asking_price: 0, zip_code: "02155", user: user_2)

item_21 = Item.create(name: "First Item3", description: "please buy me!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrOiUqo7Vs6mL-xagFkWdK2B0ASyPlRe5v1jFe9KqjL61CbyU8&usqp=CAU", asking_price: 2000, zip_code: "02124", user: user_3)
item_22 = Item.create(name: "Second Item3", description: "please buy me next!", image: "https://target.scene7.com/is/image/Target/GUEST_35367bf2-741c-4685-92aa-04df7b3fd472?wid=488&hei=488&fmt=pjpeg", asking_price: 3000, zip_code: "02124", user: user_3)
item_23 = Item.create(name: "Third Item3", description: "the best items have long long descriptions", image: "https://di2ponv0v5otw.cloudfront.net/posts/2019/02/05/5c5a3aea9fe4869021dc4c02/m_5c5a3b069fe4869021dc4d36.jpg", asking_price: 1569, zip_code: "02124", user: user_3)
item_24 = Item.create(name: "Fourth Item3", description: "the best items have long long loooooooong descriptions", image: "https://i.pinimg.com/474x/05/f5/43/05f54304b50ece254d6272159a1fcb47.jpg", asking_price: 0, zip_code: "02124", user: user_3)

item_31 = Item.create(name: "First Item4", description: "please buy me!", image: "https://c.stocksy.com/a/zly500/z9/1425255.jpg", asking_price: 2000, zip_code: "02102", user: user_4)
item_32 = Item.create(name: "Second Item4", description: "please buy me next!", image: "https://i.etsystatic.com/14694522/r/il/8797f6/2033236905/il_794xN.2033236905_hxih.jpg", asking_price: 3000, zip_code: "02102", user: user_4)
item_33 = Item.create(name: "Third Item4", description: "the best items have long long descriptions", image: "https://assets.catawiki.nl/assets/2018/3/5/1/1/c/11c7a1ee-347f-4b1a-a3b8-0f812038eb0e.jpg", asking_price: 1569, zip_code: "02102", user: user_4)
item_34 = Item.create(name: "Fourth Item4", description: "the best items have long long loooooooong descriptions", image: "https://cdn.shopify.com/s/files/1/2622/2548/products/wholesale-plush-in-a-rush-106-14242280636518_1024x1024.jpg?v=1585150446", asking_price: 0, zip_code: "02102", user: user_4)


comment_1 = Comment.create(body: "Wow would you look at that!", user: user_9, item: item_1)
comment_2 = Comment.create(body: "Never seen one of those!", user: user_2, item: item_1)
comment_3 = Comment.create(body: "amazing!", user: user_4, item: item_1)

comment_1 = Comment.create(body: "Wow would you look at that!", user: user_7, item: item_2)
comment_2 = Comment.create(body: "Never seen one of those!", user: user_5, item: item_2)
comment_3 = Comment.create(body: "amazing!", user: user_8, item: item_2)
