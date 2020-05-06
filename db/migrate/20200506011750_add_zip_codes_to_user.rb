class AddZipCodesToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :zip_code, :string, null: false
  end
end
