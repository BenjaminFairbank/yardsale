class AddBlurbToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :blurb, :string
  end
end
