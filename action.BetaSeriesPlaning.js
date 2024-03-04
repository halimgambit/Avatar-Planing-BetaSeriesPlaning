'use strict';

// Ce module vérifie prépare l'objet data envoyé au plugin

Object.defineProperty(exports, "__esModule", {
  value: true
});


exports.default = function (state) {
	
	return new Promise(function (resolve, reject) {
		
		// Recherche si une pièce est dans la phrase.
		let room = Avatar.ia.clientFromRule (state.rawSentence);
		
		setTimeout(function(){ 
			if (state.debug) info('Action BetaSeriesPlaning');
			
			state.action = {
				module: 'BetaSeriesPlaning',
				room: room,
				sentence: state.sentence,
				rawSentence: state.rawSentence
			};
			resolve(state);
		}, 500);	
		
	});
};



