/**
* @license MIT
* @author <steven@velozo.com>
*/
var libGetPixels = require('get-pixels');
var libQuantifier = require('quantifier');
//var libUnderscore = require('underscore');

/**
* Imogen Application Services Support Library
*
* @class Imogen
*/
var Imogen = function()
{
	function createNew(pSettings)
	{
		console.log('-->> Loading file...');
		// Get starting millisecond
		var tmpOperationStartTime = +new Date();

		var _Image = libGetPixels("/OSS/imogen/test/CarapaceRainbow.png", 
			function(err, pixels) 
			{
				var tmpOperationEndTime = +new Date();
				var tmpOperationTime = tmpOperationEndTime - tmpOperationStartTime;

				if(err)
				{
					console.log("Bad image path")
					return
				}
				var tmpDimensions = pixels.shape.slice();
				console.log("  > Got Pixels: ", tmpDimensions)
				console.log('  > Pixel Read Completed ('+tmpOperationTime+'ms)');

				tmpDisplayOperationEndTime = +new Date();
				tmpDisplayOperationTime = tmpDisplayOperationEndTime-tmpOperationEndTime;

				var tmpRed = libQuantifier.new();

				for (var x = 0; x < tmpDimensions[0]; x++)
					for (var y = 0; y < tmpDimensions[1]; y++)
					{
						var tmpPixel = pixels.get(x,y,2);
						if (tmpPixel > 0)
							tmpRed.addBin(tmpPixel);
					}

				console.log('  > Done Getting Histogram in ('+tmpDisplayOperationTime+'ms)');

				tmpRed.generateStatistics();
				console.log(JSON.stringify(tmpRed.statistics));

				tmpOperationTime = tmpDisplayOperationEndTime - tmpOperationStartTime;
				console.log('  > Total Parse Time '+tmpOperationTime+'ms');
				tmpRed.renderReport('VerticalBar');
			}
		);

		/**
		* Container Object for our Factory Pattern
		*/
		var tmpNewImogenObject = (
		{
			new: createNew
		});

		/**
		 * Settings Management Library
		 *
		 * @property settingsmanager
		 * @type Object
		Object.defineProperty(tmpNewImogenObject, 'settingsManager',
			{
				get: function() { return _Settings; },
				enumerable: false
			});
		 */

		return tmpNewImogenObject;
	}

	return createNew();
};

module.exports = new Imogen();