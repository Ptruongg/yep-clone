from app.models import db, environment, SCHEMA, Business

def seed_businesses():
    business1 = Business(
        name = "HTL Motorsports",
        description = "HTL Motorsports automotive workshop, we specializing in tech service, performance and installation. Our mission is to offer the ultimate satisfaction to our clientele by challenging ourselves in providing the sufficient time and energy required on every car that we have the pleasure of working on.",
        address = "756 Ride or Die Dr",
        city = "Santa Clara",
        state = "CA",
        zipcode = "95051",
        country = "United States",
        user_id = 1,
        phone_number = 4082179112
    )
    business2 = Business(
        name = "Detailz",
        description = "At Detailz, we specialize in complete quality service, delivered in a personal and professional manner. Unlike our competitors, we don't offer bogus coupons, come-ons, or ''discount specials.'' True quality and customer service shouldn't be offered behind the smokescreen of discounts and coupons. The simple fact is if you pay less, you get less.",
        address = "975 Hosetter Rd",
        city = "San Jose",
        state = "CA",
        zipcode = "95132",
        country = "United States",
        user_id = 2,
        phone_number = 4085086022
    )
    business3 = Business(
        name = "SLT Auto Repair",
        description = "We are open call for appointment 408 508 6022. We are a full service car care center specializing in Lexus and Toyota. We are certified in Hybrid, Electric Vehicle and Fuel Cell Vehicle. Factory trained, ASE certified technicians and committed to providing you with a wide range of high quality automotive repair and maintenance services.",
        address = "281 N Oaks Ave.",
        city = "Sunnyvale",
        state = "CA",
        zipcode = "94085",
        country = "United States",
        user_id = 3,
        phone_number = 4085086022
    )
    business4 = Business(
        name = "ECU Tuning",
        description = "ECU Tuning Group specializes in performance tuning for your modern European car. More Power Improved Throttle Response Increase Economy Removal of speed limiter (if requested)",
        address = "933 Berryessa Rd Ste 20",
        city = "San Jose",
        state = "CA",
        zipcode = "95133",
        country = "United States",
        user_id = 4,
        phone_number = 4087689099
    )
    business5 = Business(
        name = "EJ Auto Repair",
        description = "At EJ Auto Repair we specialize in EJ engines specifically Subarus but we also work on other JDM cars. Our expertise range from maintenance to tuning. We also work on suspension and exterior work. ",
        address = "1660 Almaden Rd",
        city = "Fremont",
        state = "CA",
        zipcode = "92062",
        country = "United States",
        user_id = 5,
        phone_number = 5103107650
    )



    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.add(business4)
    db.session.add(business5)
    db.session.commit()

def undo_businesses():
    if environment == "production":
        pass
        # db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()
