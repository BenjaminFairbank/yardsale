class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.belongs_to :user,           null: false

      t.string :name, :limit => 30, null: false
      t.string :description,        null: false
      t.string :image
      t.integer :asking_price,      null: false
      t.string :zip_code,           null: false

      t.timestamps                  null: false
    end
  end
end
