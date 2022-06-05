
function RestaurantFrame(props) {
    var restaurant = props.restaurant;
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{restaurant.name}</h5>
                    <h6>{restaurant.address}</h6>
                    <h6>Doplačilo: {restaurant.surcharge}€</h6>
                    <h6>Cena obroka: {restaurant.price}€</h6>
                </div>
            </div>
        </div >
    )
}
export default RestaurantFrame;