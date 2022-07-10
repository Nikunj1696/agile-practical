import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        full_name: {
            type: String,
            required: false,
		},
		/**
         * 1 => Admin and 2 => User
         */
		type: {
			type: Number,
			required: false,
			default: 2,
		},
        email: {
            type: String,
            required: true,
		},
		password: {
			type: String,
			required: false,
		},
        address: {
            type: String,
            required: false,
        },
        mobile: {
            type: String,
            required: false,
        },
        education_details: {
            type: Array,
            required: false,
        },
        work_experience: {
            type: Array,
            required: false,
        },
        known_languages: {
            type: Array,
            required: false,
		},
		preferred_location: {
			type: String,
			required: false,
		},
		ExpectedCTC: {
			type: String,
			required: false,
		},
		CurrentCTC: {
			type: String,
			required: false,
		},
		NoticePeriod: {
			type: String,
			required: false,
		},
		token: {
			type: String,
			required: false,
		},
		deleted_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

const User = mongoose.model('Users', userSchema);

export default User;
