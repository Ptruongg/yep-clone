from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='User', password='password', user_image='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', first_name='Marnie', last_name='Momamba', password='password', user_image='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', first_name='Bobbie', last_name='Bills', password='password', user_image='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
    calvin = User(
        username='CalvinGOAT', email='goatness@aa.io', first_name='Calvin', last_name='Goat', password='password', user_image='https://upload.wikimedia.org/wikipedia/commons/f/ff/Domestic_goat_kid_in_capeweed.jpg')
    danny = User(
        username='dancingdanny', email='dancingdanny@aa.io', first_name='Danny', last_name='Dancing', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')
    barnie = User(
        username='barnie', email='barnie@aa.io', first_name='barnie', last_name='Dancing', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')
    rm = User(
        username='rm', email='rm@aa.io', first_name='rm', last_name='joon', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')
    jungkook = User(
        username='jungkook', email='jungkook@aa.io', first_name='jungkook', last_name='jeon', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')
    nayeon = User(
        username='nayeon', email='nayeon@aa.io', first_name='im', last_name='nayeon', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')
    mina = User(
        username='mina', email='mina@aa.io', first_name='mina', last_name='myoi', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')
    naeun = User(
        username='naeun', email='naeun@aa.io', first_name='naeun', last_name='son', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')
    gdragon = User(
        username='gdragon', email='gdragon@aa.io', first_name='g', last_name='dragon', password='password', user_image='https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(calvin)
    db.session.add(danny)
    db.session.add(barnie)
    db.session.add(rm)
    db.session.add(jungkook)
    db.session.add(nayeon)
    db.session.add(mina)
    db.session.add(naeun)
    db.session.add(gdragon)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
