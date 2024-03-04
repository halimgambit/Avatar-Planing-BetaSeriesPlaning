exports.action = async function (data, callback) {
    let client = setClient(data);
    info("BetaSeriesPlanning from:", data.client, "To:", client);
    betaseries (data, client);
	callback();
}

function betaseries(data, client) {

    const CleApi = Config.modules.BetaSeriesPlaning.CleApi;
    const token = Config.modules.BetaSeriesPlaning.token;

if (!CleApi || !token) {
  Avatar.speak("Identifiant ou mot de passe invalide", data.client, () => {
    Avatar.Speech.end(data.client);
  });
  return;
}

const BASE_URL = "https://api.betaseries.com/planning/member?v=3.0";

const startDate = new Date();
const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);

async function series() {
  try {
    const url = `${BASE_URL}&key=${CleApi}&token=${token}&start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error Code: ${response.status}`);
    }

    const responseData = await response.json();

    const upcomingEpisodes = responseData.episodes.filter(episode => {
      const episodeDate = new Date(episode.date);
      return episodeDate >= startDate && episodeDate <= endDate;
    });

    // Check for episodes available today
    const todayEpisodes = upcomingEpisodes.filter(episode => {
      const episodeDate = new Date(episode.date);
      return episodeDate.getDate() === startDate.getDate();
    });

    if (todayEpisodes.length > 0) {
      // Announce available episodes today
      Avatar.speak("Voici les épisodes disponibles aujourd'hui :", data.client, () => {
        let message = "";
        todayEpisodes.forEach((episode, index) => {
          const formattedDate = episode.date.split("-").reverse().join("/");
          message += `${episode.show.title}. saison ${episode.season}. épisode ${episode.episode}. disponible le ${formattedDate}.`;

          if (index < todayEpisodes.length - 1) {
            message += " ";
          }
        });

        Avatar.speak(message, data.client, () => {
          Avatar.speak("Pour les prochains jours :", data.client, () => {
            let message = "";
            upcomingEpisodes.forEach((episode, index) => {
              const formattedDate = episode.date.split("-").reverse().join("/");
              message += `${episode.show.title}. saison ${episode.season}. épisode ${episode.episode}. disponible le ${formattedDate}.`;

              if (index < upcomingEpisodes.length - 1) {
                message += " ";
              }
            });

            Avatar.speak(message, data.client, () => {
              Avatar.Speech.end(data.client);
            });
          });
        });
      });
    } else {
      Avatar.speak("Aucun épisode disponible aujourd'hui.", data.client, () => {
        Avatar.speak("Pour les prochains jours :", data.client, () => {
          let message = "";
          upcomingEpisodes.forEach((episode, index) => {
            const formattedDate = episode.date.split("-").reverse().join("/");
            message += `${episode.show.title}. saison ${episode.season}. épisode ${episode.episode}. disponible le ${formattedDate}.`;

            if (index < upcomingEpisodes.length - 1) {
              message += " ";
            }
          });

          Avatar.speak(message, data.client, () => {
            Avatar.Speech.end(data.client);
          });
        });
      });
    }

  } catch (error) {
    console.error(`Erreur d'appel à l'API Beta Series: ${error.message}`);
  }
}

series();

    
}


function setClient(data) {
    let client = data.client;
    if (data.action.room)
        client = (data.action.room !== 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
        client = data.action.setRoom;
    return client;
}