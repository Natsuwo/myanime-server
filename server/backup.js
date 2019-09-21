const axios = require('axios')
const Anime = require('../models/Anime')
const Term = require('../models/Term')
const AnimeMeta = require('../models/AnimeMeta')
const data = require('../post.json')
const endpoint = 'http://localhost:8080/api/episode/postEx'
const { Client, Attachment } = require('discord.js')
const token = 'NjI0MjI5NzA2NTE4MjMzMTA4.XYOfhA.8cga4RgE2Hk956nLosoQ6ftVTCc'
const client = new Client()
client.on('ready', () => {
    console.log('im ready')
})
client.login(token)

async function abc() {
    function loopData(value) {
        return new Promise((resolve) => {
            resolve(value)
        });
    }
    function isValid(url) {
        var regExp = /(?:https?:\/\/)?(?:[\w\-]+\.)*(?:drive|docs)\.google\.com\/(?:(?:open|uc)\?(?:[\w\-\%]+=[\w\-\%]*&)*id=|(?:folder|file)\/d\/|\/ccc\?(?:[\w\-\%]+=[\w\-\%]*&)*key=)([\w\-]{28,})/i;
        var match = url.match(regExp);
        if (!match) {
            return false;
        }
        return true;
    }
    async function processs() {
        for (var i = 33182; i <= 37917; i++) {
            var valid = data.post.posts[i]
            if (!valid) {
                continue;
            }
            var title = data.post.posts[i].post.post_title,
                description = data.post.posts[i].post.post_content,
                thumbnail = data.post.posts[i].meta._thumbnail_url,
                type = data.post.posts[i].terms.post_tag[0],
                premiered = data.post.posts[i].terms.release_year[0],
                status = data.post.posts[i].terms.status[0],
                rating = data.post.posts[i].terms.rating[0],
                season = data.post.posts[i].terms.season[0],
                studios = data.post.posts[i].terms.animation_work[0]

            var attach = new Attachment(thumbnail)
            await client.channels.get('624269169013293056').send(attach).then(async res => {
                axios.defaults.headers.common['Authorization'] = 'Bot NjI0MjI5NzA2NTE4MjMzMTA4.XYOfhA.8cga4RgE2Hk956nLosoQ6ftVTCc';
                await axios.get('https://discordapp.com/api/channels/624269169013293056/messages/' + res.id).then(resl => {
                    thumbnail = resl.data.attachments[0].url
                }).catch(err => {
                    thumbnail = 'https://cdn.discordapp.com/attachments/624269169013293056/624447157176369152/-ERROR.full.1150268.jpg'
                }) 
            }).catch(err => {
                thumbnail = 'https://cdn.discordapp.com/attachments/624269169013293056/624447157176369152/-ERROR.full.1150268.jpg'
            }) 

            var anime = await Anime.create({ title, description, thumbnail, type, premiered, status, rating, season, studios })
            var anime_id = anime.anime_id
            var jp_title = data.post.posts[i].meta.title_japanese,
                cn_title = data.post.posts[i].meta.title_chinese,
                en_title = data.post.posts[i].meta.title_english,
                ko_title = data.post.posts[i].meta.title_korean
            if (jp_title) await AnimeMeta.create({ anime_id, meta_key: 'jp_title', meta_value: jp_title })
            if (cn_title) await AnimeMeta.create({ anime_id, meta_key: 'cn_title', meta_value: cn_title })
            if (en_title) await AnimeMeta.create({ anime_id, meta_key: 'en_title', meta_value: en_title })
            if (ko_title) await AnimeMeta.create({ anime_id, meta_key: 'ko_title', meta_value: ko_title })

            var genres = data.post.posts[i].terms.category

            console.log(i)
            async function LoopEpisode() {
                var promises = []
                var episodesEnglish = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=english&au=japanese`)).data
                var episodesChinese = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=chinese&au=japanese`)).data
                var episodesChineseEng = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=english&au=chinese`)).data
                var episodesChineseAu = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=chinese&au=chinese`)).data
                var episodesRaw = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=xx&au=japanese`)).data

                if (episodesEnglish.success && episodesEnglish.source) {
                    for (var episode of episodesEnglish.source) {
                        var source = episode.url
                        if (!isValid(source)) {
                            source = episode.backup
                        }
                        var title = episode.title
                        var thumbnail = episode.thumbnail
                        var number = parseInt(episode.number)
                        var type = episode.source
                        var audio = episode.audio
                        var subtitle = episode.subtitle
                        var fansub = episode.group
                        var episodeCreate = await axios.post(endpoint, {
                            anime_id, title, number, type, audio, subtitle, fansub, source, thumbnail
                        })
                        promises.push(loopData(episodeCreate))
                    }
                }

                if (episodesChinese.success && episodesChinese.source) {
                    for (var episode of episodesChinese.source) {
                        var source = episode.url
                        if (!isValid(source)) {
                            source = episode.backup
                        }
                        var title = episode.title
                        var thumbnail = episode.thumbnail
                        var number = parseInt(episode.number)
                        var type = episode.source
                        var audio = episode.audio
                        var subtitle = episode.subtitle
                        var fansub = 'Unknown'
                        var episodeCreate = await axios.post(endpoint, {
                            anime_id, title, number, type, audio, subtitle, fansub, source, thumbnail
                        })
                        promises.push(loopData(episodeCreate))
                    }
                }

                if (episodesRaw.success && episodesRaw.source) {
                    for (var episode of episodesRaw.source) {
                        var source = episode.url
                        if (!isValid(source)) {
                            source = episode.backup
                        }
                        var title = episode.title
                        var number = parseInt(episode.number)
                        var thumbnail = episode.thumbnail
                        var type = episode.source
                        var audio = episode.audio
                        var subtitle = episode.subtitle
                        var fansub = 'Unknown'
                        var episodeCreate = await axios.post(endpoint, {
                            anime_id, title, number, type, audio, subtitle, fansub, source, thumbnail
                        })
                        promises.push(loopData(episodeCreate))
                    }
                }

                if (episodesChineseEng.success && episodesChineseEng.source) {
                    for (var episode of episodesChineseEng.source) {
                        var source = episode.url
                        if (!isValid(source)) {
                            source = episode.backup
                        }
                        var title = episode.title
                        var number = parseInt(episode.number)
                        var thumbnail = episode.thumbnail
                        var type = episode.source
                        var audio = episode.audio
                        var subtitle = episode.subtitle
                        var fansub = 'Unknown'
                        var episodeCreate = await axios.post(endpoint, {
                            anime_id, title, number, type, audio, subtitle, fansub, source, thumbnail
                        })
                        promises.push(loopData(episodeCreate))
                    }
                }

                if (episodesChineseAu.success && episodesChineseAu.source) {
                    for (var episode of episodesChineseAu.source) {
                        var source = episode.url
                        if (!isValid(source)) {
                            source = episode.backup
                        }
                        var title = episode.title
                        var number = parseInt(episode.number)
                        var thumbnail = episode.thumbnail
                        var type = episode.source
                        var audio = episode.audio
                        var subtitle = episode.subtitle
                        var fansub = 'Unknown'
                        var episodeCreate = await axios.post(endpoint, {
                            anime_id, title, number, type, audio, subtitle, fansub, source, thumbnail
                        })
                        promises.push(loopData(episodeCreate))
                    }
                }

                return Promise.all(promises)
            }

            async function LoopAction() {

                var term_id = []
                for (genre of genres) {
                    var valid = await Term.findOne({ type: 'genre', key: genre })
                    if (!valid) {
                        var term = await Term.create({ type: 'genre', key: genre })
                        term_id.push(loopData(term.term_id))
                    } else {
                        term_id.push(loopData(valid.term_id))
                    }

                }
                return Promise.all(term_id)
            }
            await LoopEpisode()
            var resl = await LoopAction()
            await AnimeMeta.create({ anime_id, meta_key: 'genre', meta_value: resl })
        }

    }
    processs()
}

route.get('/import-data', (req, res, next) => {
    abc()
    res.send({ success: true })
})



const Episode = require('../models/Episode')
const { Client, Attachment } = require('discord.js')
const token = 'NjI0MjI5NzA2NTE4MjMzMTA4.XYOfhA.8cga4RgE2Hk956nLosoQ6ftVTCc'
const client = new Client()
const axios = require('axios')
client.on('ready', () => {
    console.log('im ready')
})
client.login(token)

route.get('/v2/up-image', async (req, res) => {
    res.send({ success: true })
    var count = 0
    async function run(skip, channel) {
        var episodes = await Episode.find().skip(parseInt(skip)).limit(2000)
        for (var episode of episodes) {
            var episode_id = episode.episode_id
            var thumbnail = episode.thumbnail
            var attach = new Attachment(thumbnail, episode_id + '.jpg')
            await client.channels.get(channel).send(attach).then(async res => {
                axios.defaults.headers.common['Authorization'] = 'Bot NjI0MjI5NzA2NTE4MjMzMTA4.XYOfhA.8cga4RgE2Hk956nLosoQ6ftVTCc';
                await axios.get('https://discordapp.com/api/channels/' + channel + '/messages/' + res.id).then(resl => {
                    thumbnail = resl.data.attachments[0].url
                }).catch(err => {
                    console.log(err.message)
                    thumbnail = 'https://cdn.discordapp.com/attachments/624559812054876181/624560031475433482/Fix_Error_Code_6602-720x340.jpeg'
                })
            }).catch(err => {
                console.log(err.message)
                thumbnail = 'https://cdn.discordapp.com/attachments/624559812054876181/624560031475433482/Fix_Error_Code_6602-720x340.jpeg'
            })
            await Episode.updateOne({ episode_id }, { thumbnail })
            count++
            console.log(count)
        }
        console.log('done')
    }
    var channel1 = '624579939471196180'
    var channel2 = '624580097101398016'
    var channel3 = '624580119972806666'
    var channel4 = '624580151937728513'
    run(0, channel1)
    run(2000, channel1)
    run(4000, channel2)
    run(6000, channel3)
    run(8000, channel4)
    run(10000, channel1)
    run(12000, channel2)
    run(14000, channel3)
    run(16000, channel4)
    run(18000, channel2)
    run(20000, channel1)
    run(22000, channel2)
    run(24000, channel3)
    run(26000, channel4)
    run(28000, channel2)
    run(30000, channel1)
})