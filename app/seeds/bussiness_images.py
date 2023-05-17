from app.models import db, environment, SCHEMA, BusinessImage

def seed_business_images():
    business1Image1 = BusinessImage(
        business_id = '1',
        url = "https://2.bp.blogspot.com/-MZg7BCeQcsg/WU6VFS4K4QI/AAAAAAAAH6I/oITk1r_57xwxsmQHOmh2h0faDembJ0KMACLcBGAs/s1600/19400480_1327321600716974_4349811817606981202_o.jpg",
        preview = False,
    )
    business1Image2 = BusinessImage(
        business_id = '1',
        url = "https://i.pinimg.com/originals/1c/bd/7c/1cbd7cc37d1423cee2f38d885086c6e7.jpg",
        preview = False,
    )
    business2Image1 = BusinessImage(
        business_id = '2',
        url = "https://www.schmitt.com/wp-content/uploads/2019/06/1992-Nissan-GT-R-R32-Skyline-1.jpg",
        preview = False,
    )
    db.session.add(business1Image1)
    db.session.add(business1Image2)
    db.session.add(business2Image1)

    db.session.commit()
def undo_business_images():
    if environment == "production":
        pass
    else:
        db.session.execute("DELETE from business_image")
    db.session.commit()
