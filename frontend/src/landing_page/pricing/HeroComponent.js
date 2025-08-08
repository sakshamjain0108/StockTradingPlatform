function HeroComponent({imgLink,heading,desc}) {
    return ( 
        <div>
            <img src={`Media/${imgLink}.svg`} alt="" />
            <h1>{heading}</h1>
            <p>{desc}</p>
        </div>
     );
}

export default HeroComponent;