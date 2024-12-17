import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { getRandomProducts } from '../../utils/functions';
import { useLocation } from 'react-router-dom';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState(location.search ? location.search.split("=")[1] : "");
    const [ratings, setRatings] = useState(0);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setRatings(0);
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, category, price, ratings, currentPage));
  
    }, [dispatch, keyword, category, price, ratings, currentPage, error, enqueueSnackbar]);
   

    const productsLocal = [
        {
            _id: "1",
            name: "Premium Quality Toor Dal - 1kg",
            images: [{ url: "https://www.jiomart.com/images/product/original/492851037/good-life-unpolished-toor-dal-500-g-product-images-o492851037-p591219161-0-202301260637.jpg?im=Resize=(420,420)" }],
            ratings: 4.8,
            numOfReviews: 420,
            price: 120,
            cuttedPrice: 150,
            category: "Pulses"
        },
        {
            _id: "2",
            name: "Fresh Chana Dal - 1kg",
            images: [{ url: "data:image/jpeg;base64,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" }],
            ratings: 4.7,
            numOfReviews: 350,
            price: 80,
            cuttedPrice: 100,
        },
        {
            _id: "3",
            name: "Organic Moong Dal - 1kg",
            images: [{ url: "https://m.media-amazon.com/images/I/71BDGHAUKAL.jpg" }],
            ratings: 4.9,
            numOfReviews: 290,
            price: 140,
            cuttedPrice: 170,
        },
        {
            _id: "4",
            name: "Urad Dal - Split 1kg",
            images: [{ url: "data:image/jpeg;base64,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" }],
            ratings: 4.6,
            numOfReviews: 200,
            price: 100,
            cuttedPrice: 125,
        },
        {
            _id: "5",
            name: "Masoor Dal - Whole 1kg",
            images: [{ url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y3rsjTkhHK-z-0amlY5GpSegV4MwdpilVg&s" }],
            ratings: 4.5,
            numOfReviews: 180,
            price: 110,
            cuttedPrice: 140,
        },
    ];
    

    
    return (
        <>
            <MetaData title="All Products | Dalmart"  />

            {/* <MinCategory /> */}
            <main className="w-full mt-14 sm:mt-0" style={{marginTop:"80px"}}>

                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">

                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">

                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white rounded-sm shadow">

                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span className="uppercase text-primary-blue text-xs cursor-pointer font-medium" onClick={() => clearFilters()}>clear all</span>
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                                {/* price slider filter */}
                                <div className="flex flex-col gap-2 border-b px-4">
                                    <span className="font-medium text-xs">PRICE</span>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        getAriaLabel={() => 'Price range slider'}
                                        min={0}
                                        max={200000}
                                        sx={{
                                            color: 'rgb(34 197 94)', // Example Tailwind green-500 color
                                            '& .MuiSlider-thumb': {
                                                boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)', // Example Tailwind shadow-sm
                                            },
                                            '& .MuiSlider-track': {
                                                backgroundColor: 'rgb(34 197 94)', // Same green-500 color
                                            },
                                            '& .MuiSlider-rail': {
                                                backgroundColor: 'rgb(209 213 219)', // Tailwind gray-300
                                            },
                                        }}
                                    />

                                    <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[0].toLocaleString()}</span>
                                        <span className="font-medium text-gray-400">to</span>
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[1].toLocaleString()}</span>
                                    </div>
                                </div>
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col border-b px-4">

                                    {/* <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                        <p className="font-medium text-xs uppercase">Category</p>
                                        {categoryToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div> */}
{/* 
                                    {categoryToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    name="category-radio-buttons"
                                                    value={category}
                                                >
                                                    {categories.map((el, i) => (
                                                        <FormControlLabel value={el} control={<Radio size="small" />} label={<span className="text-sm" key={i}>{el}</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )} */}

                                </div>
                                {/* category filter */}

                                {/* ratings filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setRatingsToggle(!ratingsToggle)}>
                                        <p className="font-medium text-xs uppercase">ratings</p>
                                        {ratingsToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {ratingsToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => setRatings(e.target.value)}
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {[4, 3, 2, 1].map((el, i) => (
                                                        <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}<StarIcon sx={{ fontSize: "12px", mr: 0.5 }} /> & above</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* ratings filter */}

                            </div>

                        </div>
                        {/* <!-- nav tiles --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1">

                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                                <img draggable="false" className="w-1/2 h-44 object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="Search Not Found" />
                                <h1 className="text-2xl font-medium text-gray-900">Sorry, no results found!</h1>
                                <p className="text-xl text-center text-primary-grey">Please check the spelling or try searching for something else</p>
                            </div>
                        )}

                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">

                                <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
                                    {productsLocal?.map((product) => (
                                            <Product {...product} key={product._id} />
                                        ))
                                    }
                                </div>
                                {filteredProductsCount > resultPerPage && (
                                    <Pagination
                                        count={Number(((filteredProductsCount + 6) / resultPerPage).toFixed())}
                                        page={currentPage}
                                        onChange={(e, val) => setCurrentPage(val)}
                                        color="primary"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    {/* <!-- search column --> */}
                </div >
                {/* <!-- row --> */}

            </main >
        </>
    );
};

export default Products;
