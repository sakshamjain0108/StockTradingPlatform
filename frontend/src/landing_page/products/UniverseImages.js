function UniverseImages({imgLink,alternate,desc}) {
    return ( 
        <div>
            <img src={`Media/${imgLink}`} alt={`${alternate}`} />
            <p>{desc}</p>
        </div> 
    );
}

export default UniverseImages;