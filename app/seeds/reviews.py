from app.models import db, environment, SCHEMA, Review

def seed_reviews():
    review1 = Review(
        review = "My left front shock/strut was leaking oil. I needed to fix it urgently but a lot of shops are not open on the weekends. Luckily, a close friend of mine recommended HTL Motorsports. Danny was able to fit me in last minute to fix my suspension. The return time was very quick and the car is driving better than ever. I highly recommend Danny's shop for all of your automobile repairs.",
        rating = 5,
        user_id = 5,
        business_id = 1
    )
    review2 = Review(
        review = "STEK certified store. Got my PPF here, nice work done by Matt and he's always responsible for the work. Decent price within a reasonable time frame for the entire Bay Area, I do recommend for it!",
        rating = 5,
        user_id = 4,
        business_id = 2
    )
    review3 = Review(
        review = "I've been bringing my Lexus GS in for service and repairs a few times now and am happy with their pricing, service, and quick turnaround time. Would recommend!",
        rating = 5,
        user_id = 2,
        business_id = 3
    )
    review4 = Review(
        review = "I had my 2020 Audi Q3 stage 1 tune and was happy with how it felt afterward also had my ceramic tint here done too and it was something that i never though they had but its worth every penny and the quality of work is on point",
        rating = 5,
        user_id = 2,
        business_id = 4
    )
    review5 = Review(
        review = "First things first, Jose was great to work with on this project. I emailed him a lot asking a lot of questions regarding the install, pricing, time, etc, and he was super patient and courteous when answering everything. His respond time was great, all within an hour or within the day. I asked him and his team to install a Cobb Stage 2 Redline Kit for me and a AOS (Air Oil Separator). Every shop I asked said they would take 2 days to do the install, which I understood, since the AOS is quite the install. But during the install, Jose let me know that they would be able to do both within the day. That was great news to me, since my WRX is my only car. The work was really clean. They took the proper precautions to protect your car during the install. By request, they saved all the old parts for me since i requested it, with which they helped pack back into the boxes that came with the Stage 2 Kit. The communication during the install was also great, they would message me during the install and sent photos as well. Also as a plus if you like dogs, they have the friendliest dogs chilling there. Their dogs just wanted all the pets lol. I've been driving the car for almost a week at the time of this review, and haven't run into any problems.",
        rating = 5,
        user_id = 1,
        business_id = 5
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        pass
        # db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()
