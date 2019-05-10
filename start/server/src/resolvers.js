// We recommend keeping your resolvers thin as a best practice.
// This allows you to safely refactor without worrying about breaking your API.

module.exports = {
    Query: {
        launches: (_, __, { dataSources }) =>
            dataSources.launchAPI.getAllLaunches(),
        launch: (_, { id }, { dataSources }) =>
            dataSources.launchAPI.getLaunchById({ launchId: id }),
        me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
};