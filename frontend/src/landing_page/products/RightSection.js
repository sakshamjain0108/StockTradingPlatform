function RightSection({rightSectionImg,heading,desc,anchor}) {
    return ( 
        <div>
            <div>
                <h1>{heading}</h1>
                <p>{desc}</p>
                <a href="">{anchor} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div><img src={`/Media/${rightSectionImg}.png`} alt="Kite" /></div>
        </div>
     );
}

export default RightSection;