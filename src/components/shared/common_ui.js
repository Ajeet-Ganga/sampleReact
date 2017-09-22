import React from 'react';
import _ from 'lodash';



export const WizardStatus = (props) => {
	var { steps , currentStep} = props;
	return (
		<div className="wizard-notification clearfix">
					<div className="clearfix wizard-holder">
						{ _.range(steps).map(
							(val)=>
							{
								var isActive = (val+1) <= currentStep ? 'active':'';
								return <div key={val} className={`wizard-item ${isActive}`}></div>;
							})
					}
					</div>
		</div>
	);
};

export const Spinner = () => {
	return (
		<div className="se-pre-con">
		</div>
		);
 };
