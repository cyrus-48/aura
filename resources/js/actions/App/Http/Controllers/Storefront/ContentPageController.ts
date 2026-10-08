import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\ContentPageController::ourStory
* @see app/Http/Controllers/Storefront/ContentPageController.php:19
* @route '/our-story'
*/
export const ourStory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ourStory.url(options),
    method: 'get',
})

ourStory.definition = {
    methods: ["get","head"],
    url: '/our-story',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::ourStory
* @see app/Http/Controllers/Storefront/ContentPageController.php:19
* @route '/our-story'
*/
ourStory.url = (options?: RouteQueryOptions) => {
    return ourStory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::ourStory
* @see app/Http/Controllers/Storefront/ContentPageController.php:19
* @route '/our-story'
*/
ourStory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ourStory.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::ourStory
* @see app/Http/Controllers/Storefront/ContentPageController.php:19
* @route '/our-story'
*/
ourStory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ourStory.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::ourStory
* @see app/Http/Controllers/Storefront/ContentPageController.php:19
* @route '/our-story'
*/
const ourStoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ourStory.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::ourStory
* @see app/Http/Controllers/Storefront/ContentPageController.php:19
* @route '/our-story'
*/
ourStoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ourStory.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::ourStory
* @see app/Http/Controllers/Storefront/ContentPageController.php:19
* @route '/our-story'
*/
ourStoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ourStory.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ourStory.form = ourStoryForm

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::contact
* @see app/Http/Controllers/Storefront/ContentPageController.php:27
* @route '/contact'
*/
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::contact
* @see app/Http/Controllers/Storefront/ContentPageController.php:27
* @route '/contact'
*/
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::contact
* @see app/Http/Controllers/Storefront/ContentPageController.php:27
* @route '/contact'
*/
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::contact
* @see app/Http/Controllers/Storefront/ContentPageController.php:27
* @route '/contact'
*/
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::contact
* @see app/Http/Controllers/Storefront/ContentPageController.php:27
* @route '/contact'
*/
const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::contact
* @see app/Http/Controllers/Storefront/ContentPageController.php:27
* @route '/contact'
*/
contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::contact
* @see app/Http/Controllers/Storefront/ContentPageController.php:27
* @route '/contact'
*/
contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

contact.form = contactForm

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::submitContact
* @see app/Http/Controllers/Storefront/ContentPageController.php:35
* @route '/contact'
*/
export const submitContact = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitContact.url(options),
    method: 'post',
})

submitContact.definition = {
    methods: ["post"],
    url: '/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::submitContact
* @see app/Http/Controllers/Storefront/ContentPageController.php:35
* @route '/contact'
*/
submitContact.url = (options?: RouteQueryOptions) => {
    return submitContact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::submitContact
* @see app/Http/Controllers/Storefront/ContentPageController.php:35
* @route '/contact'
*/
submitContact.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitContact.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::submitContact
* @see app/Http/Controllers/Storefront/ContentPageController.php:35
* @route '/contact'
*/
const submitContactForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitContact.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::submitContact
* @see app/Http/Controllers/Storefront/ContentPageController.php:35
* @route '/contact'
*/
submitContactForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitContact.url(options),
    method: 'post',
})

submitContact.form = submitContactForm

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::faq
* @see app/Http/Controllers/Storefront/ContentPageController.php:45
* @route '/faq'
*/
export const faq = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})

faq.definition = {
    methods: ["get","head"],
    url: '/faq',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::faq
* @see app/Http/Controllers/Storefront/ContentPageController.php:45
* @route '/faq'
*/
faq.url = (options?: RouteQueryOptions) => {
    return faq.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::faq
* @see app/Http/Controllers/Storefront/ContentPageController.php:45
* @route '/faq'
*/
faq.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::faq
* @see app/Http/Controllers/Storefront/ContentPageController.php:45
* @route '/faq'
*/
faq.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: faq.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::faq
* @see app/Http/Controllers/Storefront/ContentPageController.php:45
* @route '/faq'
*/
const faqForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: faq.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::faq
* @see app/Http/Controllers/Storefront/ContentPageController.php:45
* @route '/faq'
*/
faqForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: faq.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::faq
* @see app/Http/Controllers/Storefront/ContentPageController.php:45
* @route '/faq'
*/
faqForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: faq.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

faq.form = faqForm

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::terms
* @see app/Http/Controllers/Storefront/ContentPageController.php:53
* @route '/terms'
*/
export const terms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})

terms.definition = {
    methods: ["get","head"],
    url: '/terms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::terms
* @see app/Http/Controllers/Storefront/ContentPageController.php:53
* @route '/terms'
*/
terms.url = (options?: RouteQueryOptions) => {
    return terms.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::terms
* @see app/Http/Controllers/Storefront/ContentPageController.php:53
* @route '/terms'
*/
terms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::terms
* @see app/Http/Controllers/Storefront/ContentPageController.php:53
* @route '/terms'
*/
terms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: terms.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::terms
* @see app/Http/Controllers/Storefront/ContentPageController.php:53
* @route '/terms'
*/
const termsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: terms.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::terms
* @see app/Http/Controllers/Storefront/ContentPageController.php:53
* @route '/terms'
*/
termsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: terms.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ContentPageController::terms
* @see app/Http/Controllers/Storefront/ContentPageController.php:53
* @route '/terms'
*/
termsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: terms.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

terms.form = termsForm

const ContentPageController = { ourStory, contact, submitContact, faq, terms }

export default ContentPageController