import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
import mongooseDelete from 'mongoose-delete';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        url: {
            type: String,
        },
        status: {
            type: String,
            enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        slug: {
            type: String,
            slug: 'title',
        },
    },
    { timestamps: true },
);

postSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export default mongoose.model('posts', postSchema);
