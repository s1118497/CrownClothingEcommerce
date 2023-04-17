import styled, { css } from "styled-components";

// convert sass variable to js variable
/* $sub-color: grey;
		$main-color: black; */
const subColor = "grey",
	mainColor = "black";

// convert sass mixin with css function (block of css rules)
/* @mixin shrinkLabel {
		top: -14px;
		font-size: 12px;
		color: $main-color;
} */
const shrinkLabelStyles = css`
	top: -14px;
	font-size: 12px;
	color: ${mainColor};
`;

// convert ".form-input-label"
/* form-input-label {
		color: $sub-color;
		font-size: 16px;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		left: 5px;
		top: 10px;
		transition: 300ms ease all;
		
		&.shrink {
			@include shrinkLabel;
		}
	} */
const FormInputLabel = styled.label`
	color: ${subColor};
	font-size: 16px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 5px;
	top: 10px;
	transition: 300ms ease all;
	/* conditional adding shrink styles based on props */
	${(props) => props.shrink && shrinkLabelStyles}
`;

// convert ".form-input"
/* .form-input {
		background: none;
		background-color: white;
		color: $sub-color;
		font-size: 18px;
		padding: 10px 10px 10px 5px;
		display: block;
		width: 100%;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid $sub-color;
		margin: 25px 0;

		&:focus {
			outline: none;
		}
		// ~CSS selector: select ".form-input-label" class element that are preceded by ".form-input:focus" element
		&:focus ~ .form-input-label {
			@include shrinkLabel;
		}
	} */
const Input = styled.input`
	background: none;
	background-color: white;
	color: ${subColor};
	font-size: 18px;
	padding: 10px 10px 10px 5px;
	display: block;
	width: 100%;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid ${subColor};
	margin: 25px 0;

	&:focus {
		outline: none;
	}
	/* select <FormInputLabel> when Input:focus */
	&:focus ~ ${FormInputLabel} {
		${shrinkLabelStyles}
	}
`;

// convert ".group"
/* .group {
	position: relative;
	margin: 45px 0;

	input[type="password"] {
		letter-spacing: 0.3em;
	}
 */
const Group = styled.div`
	position: relative;
	margin: 45px 0;

	input[type="password"] {
		letter-spacing: 0.3em;
	}
`;
export { FormInputLabel, Input, Group };
