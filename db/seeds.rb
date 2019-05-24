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
t1 = Template.create!(title: 'template title 1', sentences: 'these are sentences for template title 1. so many sentences. more sentences. sentences.')
t2 = Template.create!(title: 'template title 2', sentences: 'wow amazing. so cool. love this template.')
t3 = Template.create!(title: 'template title 3', sentences: 'This is a new sentence. You have never seen sentences like this before. Template 3 sentences. Amazing.')
s1 = Story.create!(template: t1, words: 'words words words cool words amazing words the best words')
s2 = Story.create!(template: t2, words: 'noun verb noun verb adjective otter otter')
s3 = Story.create!(template: t2, words: 'who what when where why')
s4 = Story.create!(template: t3, words: 'new amazing wow cool otter dan class flatiron school')
s5 = Story.create!(template: t3, words: 'awful gross disgusting words no one likes')
s6 = Story.create!(template: t3, words: 'ali sebastian alex evans cool amazing great wow')
s7 = Story.create!(template: t1, words: 'woot woot woot woot woof woof woof woof')
r1 = Recap.create!(user: danielle, story: s1, save_slot: 1)
r2 = Recap.create!(user: danielle, story: s2, save_slot: 2)
r3 = Recap.create!(user: ferris, story: s3, save_slot: 1)
r4 = Recap.create!(user: ferris, story: s4, save_slot: 2)
r5 = Recap.create!(user: ferris, story: s5, save_slot: 3)
r6 = Recap.create!(user: troy, story: s6, save_slot: 1)
r7 = Recap.create!(user: edgar, story: s7, save_slot: 1)