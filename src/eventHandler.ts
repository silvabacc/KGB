import { Client, VoiceState } from 'discord.js';
import { getConfig } from './config/getConfig';
import { httpRequest } from './httpService/http';
import { TimestampBody } from './httpService/types';
import { SearchUserResponse } from './types';
import { blacklistIds } from './config/blacklist';
const { KGB_API_URL } = getConfig();

enum Status {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

const timestampBody = (
  oldState: VoiceState,
  newState: VoiceState
): TimestampBody => {
  const date = new Date();
  return {
    username: oldState.member?.displayName || '',
    userId: oldState.member?.id || '',
    timestamp: date.getTime(),
    status: newState.channel === null ? Status.DISCONNECTED : Status.CONNECTED,
    dateText: date.toLocaleString()
  } as TimestampBody;
};

const createUserBody = (state: VoiceState) => {
  return {
    userId: state.member?.id,
    username: state.member?.displayName
  };
};

/**
 * EventHandler handles all Discord events in one place by taking a Discord client and attaches
 * listeners to specific events on the client. Each method is an particular event found from
 * this list: https://discord-ts.js.org/docs/general/events/
 * More information about events found here:
 * https://github.com/amishshah/discord.js-guide/blob/master/development/understanding-events.md
 */
class EventHandler {
  private client: Client<boolean>;

  /**
   * @param client Discord client instance
   */
  constructor(client: Client<boolean>) {
    this.client = client;
  }

  /**
   * This method initialises all the listeners for the events that we're interested in
   * If you want to add a new event, make sure to invoke the method here
   * Otherwise, the event won't be listened to
   */
  initEvents() {
    this.ready();
    this.voiceStateUpdate();
  }

  /**
   * When the client is ready, this event is triggered
   */
  ready() {
    this.client.once('ready', () => {
      console.log('READY');
    });
  }

  /**
   * When a user voice state is changed, this event is triggered.
   * @var oldState @var newState These variables are VoiceStates that contain information
   * related to voice channels such as if the user is connected to a VC, are they muted,
   * are streaming, etc. When any of these states are changed, this event is triggered.
   *
   * e.g. If the user was connecting to a voice channel for the first time, the channel
   * will be null, and the new state will contain the voice channel that the user connected to,
   * and vice versa
   */
  voiceStateUpdate() {
    this.client.on(
      'voiceStateUpdate',
      async (oldState: VoiceState, newState: VoiceState) => {
        //Blacklist users
        if (oldState.member?.id && blacklistIds.includes(oldState.member?.id)) {
          return;
        }

        //Check if user is already stored
        const searchUserResponse: SearchUserResponse = await httpRequest(
          'get',
          `${KGB_API_URL}/user/search/${oldState.member?.id}`
        );

        //if user doesn't exist, add to the users table
        if (searchUserResponse.data.length === 0) {
          httpRequest(
            'post',
            `${KGB_API_URL}/user/create`,
            createUserBody(oldState)
          );
        }

        //Post the new Timestamp
        httpRequest(
          'post',
          `${KGB_API_URL}/timestamp`,
          timestampBody(oldState, newState)
        );
      }
    );
  }
}

export default EventHandler;
