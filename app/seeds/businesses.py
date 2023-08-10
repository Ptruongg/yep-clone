from app.models import db, environment, SCHEMA, Business


def seed_businesses():
    business1 = Business(
        name="HTL Motorsports",
        description="HTL Motorsports automotive workshop, we specializing in tech service, performance and installation. Our mission is to offer the ultimate satisfaction to our clientele by challenging ourselves in providing the sufficient time and energy required on every car that we have the pleasure of working on.",
        address="756 Ride or Die Dr",
        city="Santa Clara",
        state="CA",
        zipcode="95051",
        country="United States",
        user_id=1,
        phoneNumber="408 111-1111",
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/royQpKYzGmjgVjuQ0ZsFtg/o.jpg"
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
        phoneNumber="408 111-1111",
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/9DfjVymrp19GuiditZSCJg/o.jpg"
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
        phoneNumber="408 111-1111",
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/LNkrALRly_Wmw-Pd2R5L6Q/o.jpg "
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
        phoneNumber="408 111-1111",
        imageUrl="https://photos.smugmug.com/photos/i-rNLqWr8/0/X5/i-rNLqWr8-X5.jpg"
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
        phoneNumber="408 111-1111",
        imageUrl="https://photos.smugmug.com/photos/i-cjkgNcv/0/X5/i-cjkgNcv-X5.jpg"
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
        phoneNumber="408 111-1111",
        imageUrl="https://s3-media0.fl.yelpcdn.com/bphoto/HJfsJWbaASxVF1GFjuEuDA/o.jpg"
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
        phoneNumber="408 111-1111",
        imageUrl="https://cc-prod.scene7.com/is/image/CCProdAuthor/car-photography_P4_720x654?$pjpeg$&jpegSize=200&wid=720"
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
        phoneNumber="408 111-1111",
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
        phoneNumber="408 111-1111",
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
        phoneNumber="408 111-1111",
        imageUrl="https://a-static.besthdwallpaper.com/red-modified-toyota-supra-mk4-wallpaper-3840x2160-92500_54.jpg"
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
        phoneNumber="844 488 9232",
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
        phoneNumber="408 111-1111",
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

    db.session.commit()


def undo_businesses():
    if environment == "production":
        pass
        # db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()
