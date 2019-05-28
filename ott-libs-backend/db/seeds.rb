# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
danielle = User.create!(name: 'Danielle')
ferris = User.create!(name: 'Ferris')
troy = User.create!(name: 'Troy')
edgar = User.create!(name: 'Edgar')
s1 = Story.create!(user: danielle, recap: 1, full_story: 'words words words cool words amazing words the best words')
s2 = Story.create!(user: danielle, recap: 1, full_story: 'noun verb noun verb adjective otter otter')
s3 = Story.create!(user: danielle, recap: 2, full_story: 'who what when where why')
s4 = Story.create!(user: ferris, recap: 1, full_story: 'new amazing wow cool otter dan class flatiron school')
s5 = Story.create!(user: ferris, recap: 1, full_story: 'awful gross disgusting words no one likes')
s6 = Story.create!(user: troy, recap: 1, full_story: 'ali sebastian alex evans cool amazing great wow')
s7 = Story.create!(user: edgar, recap: 1, full_story: 'woot woot woot woot woof woof woof woof')
