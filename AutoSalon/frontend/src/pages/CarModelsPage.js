// import React, { useEffect } from "react";
// import { connect } from "react-redux";

// import { retriveCarModels } from "../actions/carmodelsActions";
// import { CarModel } from "../components/CarModel";

// const CarModelsPage = ({ dispatch, loading, carmodels, hasErrors }) => {
//     useEffect(() => {
//         dispatch(retriveCarModels())
//     }, [dispatch]);

//     const renderCarModels = () => {
//         if (loading) return <p>Loading...</p>
//         if (hasErrors) return <p>Unable to display posts.</p>
//         return carmodels.map(carmodel => <CarModel key={carmodel.id} carmodel={carmodel} />)
//     };

//     return (
//         <section>
//             <h1>Модели автомобилей</h1>
//             {renderCarModels()}
//         </section>
//     );
// };

// const mapStateToProps = (state) => ({
//     loading: state.carmodels.loading,
//     posts: state.carmodels.carmodels,
//     hasErrors: state.carmodels.hasErrors,
// });

// export default connect(mapStateToProps)(CarModelsPage);