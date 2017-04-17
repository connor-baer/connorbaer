<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the default settings in `vendor/craftcms/cms/src/config/defaults/general.php`.
 */


return [
	'*' => array(
		'devMode' => false,
		'defaultWeekStartDay' => 1,
		'omitScriptNameInUrls' => true,
		'generateTransformsBeforePageLoad' => true,
		'baseUrl' => 'https://connorbaer.co/',
		'siteUrl' => array(
			'connorbaer' => 'https://connorbaer.co/',
			'madebyconnor' => 'https://madebyconnor.co/',
			'madebyconnorDE' => 'https://madebyconnor.de/',
		),
	),
	'.dev' => array(
		'devMode' => true,
		'enableTemplateCaching' => false,
		'testToEmailAddress' => 'connor.baer@me.com',
		'userSessionDuration' => 'P2W',
		'baseUrl' => 'https://connorbaer.dev/',
		'siteUrl' => array(
			'connorbaer' => 'https://connorbaer.dev/',
			'madebyconnor' => 'https://madebyconnor.dev/',
			'madebyconnorDE' => 'https://de.madebyconnor.dev/',
		),
	),
];
