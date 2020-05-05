class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.belongs_to :user,       null: false

      t.string :name,           null: false
      t.text :description,      null: false
      t.string :image,          null: false, default: "https://logodix.com/logo/1868156.png"
      t.integer :asking_price,  null: false
      t.string :area_code,      null: false

      t.timestamps              null: false
    end
  end
end
