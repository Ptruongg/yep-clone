from app.models import db, environment, SCHEMA, Bookmark


def seed_bookmarks():
    bookmark1 = Bookmark(
        business_id=1,
        user_id=1
    )
    bookmark2 = Bookmark(
        business_id=2,
        user_id=2
    )
    bookmark3 = Bookmark(
        business_id=3,
        user_id=3
    )
    bookmark4 = Bookmark(
        business_id=4,
        user_id=4
    )
    bookmark5 = Bookmark(
        business_id=5,
        user_id=5
    )

    db.session.add(bookmark1)
    db.session.add(bookmark2)
    db.session.add(bookmark3)
    db.session.add(bookmark4)
    db.session.add(bookmark5)

    db.session.commit()

def undo_bookmarks():
    if environment == "production":
        pass
        # db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookmark")

    db.session.commit()
