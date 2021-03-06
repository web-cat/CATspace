class CreateAssignments < ActiveRecord::Migration
  def self.up
    create_table :assignments do |t|
      t.string :title
      t.text :synopsis
      t.integer :rating

      t.timestamps
    end
  end

  def self.down
    drop_table :assignments
  end
end
