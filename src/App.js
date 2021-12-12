import Sidebar from "./Component/Sidebar/sidebar";
import { Route, Switch } from "react-router";
import AllProduct from "./Component/Product/productAll";
import "./App.css";
import ProductByCategory from "./Component/Product/productByCategory";
import ProductVeiw from "./Component/Product/productView";

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>

        <div style={{ backgroundColor: "#f6f7f9" }} className="col-9">
          <Switch>
            <Route path="/product/view/:id/" component={ProductVeiw} />
            <Route exact path="/" component={AllProduct} />
            <Route
              path="/product/by/category/:id/:name/"
              component={ProductByCategory}
            />

            {/* <Route path="/profile/:id?/" component={Profile} />
          <Route path="/request/:id?/" component={RequestPage} />
          <Route path="/notification/:id?/" component={Notification} />
          <Route path="/request/:id?/" component={RequestPage} /> */}

            {/* <Route path="/home/" component={Home} /> */}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
