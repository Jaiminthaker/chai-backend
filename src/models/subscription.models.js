import mangooes, {schema} from 'mongoose';

const subscriptionSchema = new schema({
    subscriber: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    channel: {
        type: schema.Types.ObjectId,
        ref: 'User',
    },

}, {timestamps: true});

export const subscriptionModel = mangooes.model("Subscription", subscriptionSchema);

