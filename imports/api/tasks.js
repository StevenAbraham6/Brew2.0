import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('items');
export const Logs = new Mongo.Collection('logs');
