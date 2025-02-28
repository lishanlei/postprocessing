import { EventDispatcher, Uniform } from "three";
import { BlendFunction } from "./BlendFunction";

import addBlendFunction from "./glsl/add/shader.frag";
import alphaBlendFunction from "./glsl/alpha/shader.frag";
import averageBlendFunction from "./glsl/average/shader.frag";
import colorBurnBlendFunction from "./glsl/color-burn/shader.frag";
import colorDodgeBlendFunction from "./glsl/color-dodge/shader.frag";
import darkenBlendFunction from "./glsl/darken/shader.frag";
import differenceBlendFunction from "./glsl/difference/shader.frag";
import exclusionBlendFunction from "./glsl/exclusion/shader.frag";
import lightenBlendFunction from "./glsl/lighten/shader.frag";
import multiplyBlendFunction from "./glsl/multiply/shader.frag";
import divideBlendFunction from "./glsl/divide/shader.frag";
import negationBlendFunction from "./glsl/negation/shader.frag";
import normalBlendFunction from "./glsl/normal/shader.frag";
import overlayBlendFunction from "./glsl/overlay/shader.frag";
import reflectBlendFunction from "./glsl/reflect/shader.frag";
import screenBlendFunction from "./glsl/screen/shader.frag";
import softLightBlendFunction from "./glsl/soft-light/shader.frag";
import subtractBlendFunction from "./glsl/subtract/shader.frag";

/**
 * A blend function shader code catalogue.
 *
 * @type {Map<BlendFunction, String>}
 * @private
 */

const blendFunctions = new Map([
	[BlendFunction.SKIP, null],
	[BlendFunction.ADD, addBlendFunction],
	[BlendFunction.ALPHA, alphaBlendFunction],
	[BlendFunction.AVERAGE, averageBlendFunction],
	[BlendFunction.COLOR_BURN, colorBurnBlendFunction],
	[BlendFunction.COLOR_DODGE, colorDodgeBlendFunction],
	[BlendFunction.DARKEN, darkenBlendFunction],
	[BlendFunction.DIFFERENCE, differenceBlendFunction],
	[BlendFunction.EXCLUSION, exclusionBlendFunction],
	[BlendFunction.LIGHTEN, lightenBlendFunction],
	[BlendFunction.MULTIPLY, multiplyBlendFunction],
	[BlendFunction.DIVIDE, divideBlendFunction],
	[BlendFunction.NEGATION, negationBlendFunction],
	[BlendFunction.NORMAL, normalBlendFunction],
	[BlendFunction.OVERLAY, overlayBlendFunction],
	[BlendFunction.REFLECT, reflectBlendFunction],
	[BlendFunction.SCREEN, screenBlendFunction],
	[BlendFunction.SOFT_LIGHT, softLightBlendFunction],
	[BlendFunction.SUBTRACT, subtractBlendFunction]
]);

/**
 * A blend mode.
 */

export class BlendMode extends EventDispatcher {

	/**
	 * Constructs a new blend mode.
	 *
	 * @param {BlendFunction} blendFunction - The blend function.
	 * @param {Number} opacity - The opacity of the color that will be blended with the base color.
	 */

	constructor(blendFunction, opacity = 1.0) {

		super();

		/**
		 * The blend function.
		 *
		 * @type {BlendFunction}
		 * @private
		 */

		this.f = blendFunction;

		/**
		 * A uniform that controls the opacity of this blend mode.
		 *
		 * TODO Add opacity accessors for uniform value.
		 * @type {Uniform}
		 */

		this.opacity = new Uniform(opacity);

	}

	/**
	 * Returns the opacity.
	 *
	 * @return {Number} The opacity.
	 */

	getOpacity() {

		return this.opacity.value;

	}

	/**
	 * Sets the opacity.
	 *
	 * @param {Number} value - The opacity.
	 */

	setOpacity(value) {

		this.opacity.value = value;

	}

	/**
	 * The blend function.
	 *
	 * @type {BlendFunction}
	 */

	get blendFunction() {

		return this.f;

	}

	set blendFunction(value) {

		this.f = value;
		this.dispatchEvent({ type: "change" });

	}

	/**
	 * Returns the blend function.
	 *
	 * @deprecated Use blendFunction instead.
	 * @return {BlendFunction} The blend function.
	 */

	getBlendFunction() {

		return this.blendFunction;

	}

	/**
	 * Sets the blend function.
	 *
	 * @deprecated Use blendFunction instead.
	 * @param {BlendFunction} value - The blend function.
	 */

	setBlendFunction(value) {

		this.blendFunction = value;

	}

	/**
	 * Returns the blend function shader code.
	 *
	 * @return {String} The blend function shader code.
	 */

	getShaderCode() {

		return blendFunctions.get(this.blendFunction);

	}

}
