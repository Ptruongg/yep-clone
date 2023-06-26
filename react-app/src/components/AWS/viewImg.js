import React, {useState, useEffect} from "react";

const viewImgs = ({businessId}) => {
    const [imgs, setImgs] = useState([]);
    useEffect(() => {
        (async() => {
            const res = await fetch('/api/business/${businessId}/images');
            if(res.ok) {
                const data = await res.json();
                setImgs(data.imgs)
            } else {
                console.log("error", res)
            }
        })

    }, [])
    return (
        <div className='image-container'>
        {imgs.map(im => (
            <img className="biz-images" src={im.url} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://www.electricmirror.com/wp-content/uploads/2022/05/image-coming-soon.jpg";
            }} />
        ))}
    </div>
    )

}
export default viewImgs;
