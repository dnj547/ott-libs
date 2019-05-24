# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_24_184009) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "recaps", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "story_id"
    t.integer "save_slot"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["story_id"], name: "index_recaps_on_story_id"
    t.index ["user_id"], name: "index_recaps_on_user_id"
  end

  create_table "stories", force: :cascade do |t|
    t.bigint "template_id"
    t.string "words"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["template_id"], name: "index_stories_on_template_id"
  end

  create_table "templates", force: :cascade do |t|
    t.string "title"
    t.string "sentences"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "recaps", "stories"
  add_foreign_key "recaps", "users"
  add_foreign_key "stories", "templates"
end
