from app.models import db, environment, SCHEMA, BusinessImage

def seed_business_images():
    business1 = BusinessImage(
        business_id = '1',
        url = "https://2.bp.blogspot.com/-MZg7BCeQcsg/WU6VFS4K4QI/AAAAAAAAH6I/oITk1r_57xwxsmQHOmh2h0faDembJ0KMACLcBGAs/s1600/19400480_1327321600716974_4349811817606981202_o.jpg",
        preview = False,
    )

    db.session.add(business1)

    db.session.commit()
def undo_business_images():
    if environment == "production":
        pass
    else:
        db.session.execute("DELETE from business_image")
    db.session.commit()
