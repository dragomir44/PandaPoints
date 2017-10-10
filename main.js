// var firebaseApp = firebase.initializeApp( {} )
// var db = firebase.initializeApp({
//         databaseURL: 'pandapunten-1a761.firebaseapp.com'
//     }).database()
// var personenRef = db.ref('personen')

var app = new Vue({
			el: "#root",
			data: {
				personen: [
					{ name: "Bassie", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
					{ name: "Frank", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: false },
					{ name: "Inge", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
					{ name: "Jari", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
					{ name: "Jasmijn", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: false },
					{ name: "Larissa", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
					{ name: "Reinder", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: false },
					{ name: "Rick", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
					{ name: "Sergey", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
					{ name: "Tessa", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
					{ name: "Tim", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: false },
					{ name: "Tommie", punten: 0, datum: new Date().toDateString(), dagenDroog: 0, relatie: true },
				],
				highscore: [
					{ },
				],
				vandaag: new Date().toDateString(),
				newDate: "",
				winner: "",
				first: true
			},	
			// firebase: {
			// 	personen: [
			// 		personenRef.limitTolast(25)
			// 	]
			// },

			methods: {
				setNewDate(persoon) {
					if (this.newDate != '') {
						persoon.datum = new Date(this.newDate).toDateString();
						var laatste = new Date(this.newDate);
						var vandaag = new Date();
						var timeDiff = Math.abs(vandaag.getTime() - laatste.getTime());
						var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
						persoon.dagenDroog = diffDays;
						if (persoon.relatie) {
							var score = Math.ceil(persoon.dagenDroog / 3) - 1;
						} else {
							var score = Math.ceil(persoon.dagenDroog / 7) - 1;
						}
						persoon.punten = score;
					} else {
					alert("Vul een datum in");
					}
				},
	
				isWinner() {
					var win = this.orderedPersonen[0].name;
					this.winner = win;
				},
				refreshAt(hours, minutes, seconds) {
				    var now = new Date();
				    var then = new Date();

				    if(now.getHours() > hours ||
				       (now.getHours() == hours && now.getMinutes() > minutes) ||
				        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
				        then.setDate(now.getDate() + 1);
				    }
				    then.setHours(hours);
				    then.setMinutes(minutes);
				    then.setSeconds(seconds);

				    var timeout = (then.getTime() - now.getTime());
				    setTimeout(function() { window.location.reload(); }, timeout);
				},
				addHighscore() {
					var hoogste = Object.assign({}, this.orderedPersonen[0]);
					var eenahoogste = Object.assign({}, this.orderedPersonen[1]);
					//add unique factor
					if (hoogste.punten >= 4) {
						if (this.first) {
							this.highscore.push(hoogste);
							this.first = false;
						} else if (hoogste.name != this.getHighscore[1].name) {
							this.highscore.push(hoogste);
						} else {
							
						}			
					}
					
				}
			},

			computed: {
				hasRelationship() {
				 	return this.personen.filter(persoon => persoon.relatie);
				},
				hasNoRelationship() {
				 	return this.personen.filter(persoon => ! persoon.relatie);
				},
				orderedPersonen() {
					return _.orderBy(this.personen, ["punten", "dagenDroog"]).reverse();
				},
				getHighscore() {
					return _.orderBy(this.highscore, ["punten", "dagenDroog"]).reverse();
				}
			}
});