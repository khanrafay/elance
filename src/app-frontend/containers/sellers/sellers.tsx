import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Seller from '../../components/seller/seller';


const Sellers = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <React.Fragment>
            <h1>Seller</h1>
            <Carousel responsive={responsive}>
                {Array(6).fill('').map((_, i) => (
                    <div className="services" key={i}>
                        <Seller />
                    </div>
                ))}
            </Carousel>
        </React.Fragment>
    );
};

export default Sellers;