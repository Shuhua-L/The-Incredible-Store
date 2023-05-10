import { useState, useEffect } from "react";
import DropDownList from "./DropDownList.jsx";
import axios from 'axios';

const AddToOutfit = ({ selectedStyleData }) => {
	const [skus, setSkus] = useState();
	const [selectedSize, setSelectedSize] = useState();
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [availableQuantity, setAvailableQuantity] = useState([]);

	useEffect(() => {
		setSkus(selectedStyleData.skus);
	}, [selectedStyleData]);


	const setQuantityFromSize = (size) => {
		if (size === "select a size") {
			return;
		}
		//for the camo onesie, this filter fails because for some reason there is a second size option for XL that has a different quantity and SKU id, for now the program just grabs the first option for XL and ignores the second one but may have to look into a solution later if this becomes a bigger issue
		const [skuidForThatSize] = Object.keys(skus).filter(
			(skuid) => skus[skuid]["size"] === size
		);
		setAvailableQuantity(generateList(skus[skuidForThatSize]["quantity"]));
	};

	const generateList = (total) => {
		const max = 15;
		if (total === 0 || total === undefined) {
			return ["OUT OF STOCK"];
		} else if (total > max) {
			return Array.from({ length: max }, (_, i) => i + 1);
		} else {
			return Array.from({ length: total }, (_, i) => i + 1);
		}
	};

	if (!skus) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<p>size</p>
			{skus.null === undefined ? (
				<DropDownList
					placeHolder={"select a size"}
					options={skus}
					valKey={"size"}
					onChange={(value) => {
						setQuantityFromSize(value);
            setSelectedSize(value)

					}}
				/>
			) : (
				<DropDownList
					placeHolder={"OUT OF STOCK"}
					options={[]}
				/>
			)}

			<p>quantity</p>
			<DropDownList
				placeHolder={availableQuantity.length ? "1" : "-"}
				options={availableQuantity}
				onChange={(value) => {
				setSelectedQuantity(value)
				}}
			/>

			{selectedQuantity && selectedSize && <button type="button" onClick={() => {
        console.log('SELECTED OPTIONS => ', selectedQuantity, selectedSize, selectedStyleData)
      }}>add to outfit</button>}
		</div>
	);
};

export default AddToOutfit;
