function LeftSection({leftSectionImg,heading,desc,anchor1,anchor2}){
    return(
        <div>
            <div><img src={`/Media/${leftSectionImg}.png`} alt="Kite" /></div>
            <div>
                <h1>{heading}</h1>
                <p>{desc}</p>
                <div>
                    <a href="">{anchor1} {anchor1?<i class="fa-solid fa-arrow-right"></i>:null}</a>
                    <a href="">{anchor2} {anchor2?<i class="fa-solid fa-arrow-right"></i>:null}</a>
                </div>
                <div>
                    <img src="Media/googlePlayBadge.svg" alt="" />
                    <img src="Media/appStoreBadge.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default LeftSection;