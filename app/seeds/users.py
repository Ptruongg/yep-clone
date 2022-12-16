from app.models import db, User, Business


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

    business1 = Business(
        name="HTL Motorsports",
        description="HTL Motorsports automotive workshop, we specializing in tech service, performance and installation. Our mission is to offer the ultimate satisfaction to our clientele by challenging ourselves in providing the sufficient time and energy required on every car that we have the pleasure of working on.",
        address="756 Ride or Die Dr",
        city="Santa Clara",
        state="CA",
        zipcode="95051",
        country="United States",
        user_id=1,
        phoneNumber=4082179112,
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/royQpKYzGmjgVjuQ0ZsFtg/o.jpg",
        business_bookmarks=[bobbie, calvin, naeun]
    )
    business2 = Business(
        name="Detailz",
        description="At Detailz, we specialize in complete quality service, delivered in a personal and professional manner. Unlike our competitors, we don't offer bogus coupons, come-ons, or ''discount specials.'' True quality and customer service shouldn't be offered behind the smokescreen of discounts and coupons. The simple fact is if you pay less, you get less.",
        address="975 Hosetter Rd",
        city="San Jose",
        state="CA",
        zipcode="95132",
        country="United States",
        user_id=2,
        phoneNumber=4085086022,
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/9DfjVymrp19GuiditZSCJg/o.jpg",
        business_bookmarks=[bobbie, calvin, naeun]
    )
    business3 = Business(
        name="SLT Auto Repair",
        description="We are open call for appointment 408 508 6022. We are a full service car care center specializing in Lexus and Toyota. We are certified in Hybrid, Electric Vehicle and Fuel Cell Vehicle. Factory trained, ASE certified technicians and committed to providing you with a wide range of high quality automotive repair and maintenance services.",
        address="281 N Oaks Ave.",
        city="Sunnyvale",
        state="CA",
        zipcode="94085",
        country="United States",
        user_id=3,
        phoneNumber=4085086022,
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/LNkrALRly_Wmw-Pd2R5L6Q/o.jpg",
        business_bookmarks=[bobbie, calvin, naeun]
    )
    business4 = Business(
        name="ECU Tuning",
        description="ECU Tuning Group specializes in performance tuning for your modern European car. More Power Improved Throttle Response Increase Economy Removal of speed limiter (if requested)",
        address="933 Berryessa Rd Ste 20",
        city="San Jose",
        state="CA",
        zipcode="95133",
        country="United States",
        user_id=4,
        phoneNumber=4087689099,
        imageUrl="https://photos.smugmug.com/photos/i-rNLqWr8/0/X5/i-rNLqWr8-X5.jpg",
        business_bookmarks=[bobbie, calvin, naeun]
    )
    business5 = Business(
        name="EJ Auto Repair",
        description="At EJ Auto Repair we specialize in EJ engines specifically Subarus but we also work on other JDM cars. Our expertise range from maintenance to tuning. We also work on suspension and exterior work.",
        address="1660 Almaden Rd",
        city="Fremont",
        state="CA",
        zipcode="92062",
        country="United States",
        user_id=5,
        phoneNumber=5103107650,
        imageUrl="https://photos.smugmug.com/photos/i-cjkgNcv/0/X5/i-cjkgNcv-X5.jpg",
        business_bookmarks=[bobbie, calvin, naeun]
    )
    business6 = Business(
        name="Detailed By Precision",
        description="DetailedByPrecision is a auto detailing service based in San Francisco Bay Area. We provide the highest quality of auto detailing services, address the customer's needs, and offer options that fits for your specific job. We offer everything from exterior auto paint correction services, ceramic coating car, ceramic coating maintenance washes, to interior services. Paint Correction (Removes swirls, scratches, water spots, overspray) Ceramic Coating (cQuartz ceramic coating. 3 year durability) Ceramic Coating Maintenance Wash (Safely wash ceramic coated car without causing scratches) Wheels Off Coating Package.",
        address="318 Paris St",
        city="San Francisco",
        state="CA",
        zipcode="94112",
        country="United States",
        user_id=6,
        phoneNumber=4156014291,
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/HJfsJWbaASxVF1GFjuEuDA/o.jpg",
        business_bookmarks=[bobbie, calvin, naeun]
    )
    business7 = Business(
        name="JP Auto Body Shop",
        description="Peter has been repair auto body since 2000 in san francisco, ca. JP Auto Body will guarantee its work for as long as you own your car. Any defect in repair or paint will be covered at no charge, as long as it was part of JP Auto Body's repair, and no additional damage to the car is noted.",
        address="318 Paris St",
        city="San Francisco",
        state="CA",
        zipcode="94112",
        country="United States",
        user_id=7,
        phoneNumber=6508779777,
        imageUrl="https://cc-prod.scene7.com/is/image/CCProdAuthor/car-photography_P4_720x654?$pjpeg$&jpegSize=200&wid=720",
        business_bookmarks=[bobbie, calvin, naeun]
    )
    business8 = Business(
        name="Stress Free Auto Care",
        description="We believe auto repair should be fair, transparent, and convenient. We take the stress out of auto care with easy online appointments, regular text message updates, and extensive pictures and a live video feed of your service. All invoices and inspections are emailed to you as well as and stored in the cloud for your records. Most importantly, our team is experienced, knowledgeable, and will always put the customer first. Try us for Stress-Free experience.",
        address="1004 W El Camino Real ",
        city="San Francisco",
        state="CA",
        zipcode="94087",
        country="United States",
        user_id=8,
        phoneNumber=4157694111,
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/P3AmbCId1k5BdWVVlsUzfA/o.jpg"
    )
    business9 = Business(
        name="World Mufflers",
        description="Exhaust, Mufflers, Catalytic Converters, Alignments,",
        address="966 E El Saint Pedro",
        city="Sunnyvale",
        state="CA",
        zipcode="94062",
        country="United States",
        user_id=9,
        phoneNumber=4087382311,
        imageUrl="https://1.bp.blogspot.com/-dEdiVI4UkyE/X2tQjQ_NiUI/AAAAAAAFTpU/vuTWwpZMIJMWIVRu7SAOWatB0XpNUPwegCLcBGAsYHQ/w640-h426/2005%2Bwhite%2Bevo%2Bedit_-41.jpg"
    )
    business10 = Business(
        name="Mina's European and Japanese Auto Care",
        description="We specialize in computer diagnostic, engine repair, transmission services, tune ups, air condition, battery replacement, brake repair, suspension and more!",
        address="1098 Run it Dr",
        city="Los Angeles",
        state="CA",
        zipcode="96012",
        country="United States",
        user_id=10,
        phoneNumber=9959832424,
        imageUrl="https://www.jdmbuysell.com/wp-content/uploads/2022/05/1993-Toyota-Supra-for-sale-via-rhdspecialties-7059580223577.jpg"
    )
    business11 = Business(
        name="West Coast Exotics",
        description="West Coast Exotic Cars has become the premier exotic car dealer located in the heart of southern California’s beautiful wine country. Built on over twenty five years of professional race car driving experience, founder Naeun has pursued his passion as a car enthusiast. Utilizing the connections he’s built in the racing industry, Eric works hands on to buy, sell and consign high-end, exotic cars throughout the nation.",
        address="269000 Jefferson Ave ",
        city="Murrieta",
        state="CA",
        zipcode="92562",
        country="United States",
        user_id=11,
        phoneNumber=8444889232,
        imageUrl="https://www.westcoastexoticcars.com/imagetag/249/main/l/Used-2019-Porsche-911-GT3-RS-Weissach-1647888565.jpg"
    )
    business12 = Business(
        name="GDragon Autoworks",
        description="At EJ Auto Repair we specialize in EJ engines specifically Subarus but we also work on other JDM cars. Our expertise range from maintenance to tuning. We also work on suspension and exterior work.",
        address="226 Phelan Ave Ste B ",
        city="San Jose",
        state="CA",
        zipcode="95112",
        country="United States",
        user_id=12,
        phoneNumber=4083321024,
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/CqAorx5Xcr0bNkbnXUSOpQ/o.jpg"
    )

    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.add(business4)
    db.session.add(business5)
    db.session.add(business6)
    db.session.add(business7)
    db.session.add(business8)
    db.session.add(business9)
    db.session.add(business10)
    db.session.add(business11)
    db.session.add(business12)

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
