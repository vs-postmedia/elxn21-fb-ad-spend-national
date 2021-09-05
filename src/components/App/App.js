import React from 'react';
import AdSpendTracker from '../AdSpendTracker/AdSpendTracker';
import './App.css';

const adSpendUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/elxn/elxn21/fb-ad-spend.json';

function App() {
	return (
	  	<div className="App">
	  		<h2>Election ad spending on Facebook and its platforms...</h2>
	  		
	  		<AdSpendTracker	
	  			dataUrl={adSpendUrl}>
	  		</AdSpendTracker>

	  		<footer>
	  			<p className="source">Source: <a href="https://www.facebook.com/ads/library/" target="_blank" rel="noopener noreferrer">Facebook Ad Library</a> • Data includes spending by the official Facebook pages for each party and party leaders.  Data includes ads placed on Facebook, Instagram, WhatsApp, Messenger and Oculus.</p>
	  		</footer>
	  	</div>
	);
}

export default App;
	
