<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
<<<<<<< HEAD
 * Copyright (c) 2014 - 2017, British Columbia Institute of Technology
=======
 * Copyright (c) 2014 - 2015, British Columbia Institute of Technology
>>>>>>> origin/master
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
<<<<<<< HEAD
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (https://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2017, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	https://codeigniter.com
=======
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (http://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2015, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	http://codeigniter.com
>>>>>>> origin/master
 * @since	Version 3.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * CodeIgniter Redis Caching Class
 *
 * @package	   CodeIgniter
 * @subpackage Libraries
 * @category   Core
 * @author	   Anton Lindqvist <anton@qvister.se>
 * @link
 */
class CI_Cache_redis extends CI_Driver
{
	/**
	 * Default config
	 *
	 * @static
	 * @var	array
	 */
	protected static $_default_config = array(
		'socket_type' => 'tcp',
		'host' => '127.0.0.1',
		'password' => NULL,
		'port' => 6379,
		'timeout' => 0
	);

	/**
	 * Redis connection
	 *
	 * @var	Redis
	 */
	protected $_redis;

	/**
	 * An internal cache for storing keys of serialized values.
	 *
	 * @var	array
	 */
	protected $_serialized = array();

	// ------------------------------------------------------------------------

	/**
	 * Class constructor
	 *
	 * Setup Redis
	 *
	 * Loads Redis config file if present. Will halt execution
	 * if a Redis connection can't be established.
	 *
	 * @return	void
	 * @see		Redis::connect()
	 */
	public function __construct()
	{
<<<<<<< HEAD
		if ( ! $this->is_supported())
		{
			log_message('error', 'Cache: Failed to create Redis object; extension not loaded?');
			return;
		}

=======
		$config = array();
>>>>>>> origin/master
		$CI =& get_instance();

		if ($CI->config->load('redis', TRUE, TRUE))
		{
<<<<<<< HEAD
			$config = array_merge(self::$_default_config, $CI->config->item('redis'));
		}
		else
		{
			$config = self::$_default_config;
		}

=======
			$config = $CI->config->item('redis');
		}

		$config = array_merge(self::$_default_config, $config);
>>>>>>> origin/master
		$this->_redis = new Redis();

		try
		{
			if ($config['socket_type'] === 'unix')
			{
				$success = $this->_redis->connect($config['socket']);
			}
			else // tcp socket
			{
				$success = $this->_redis->connect($config['host'], $config['port'], $config['timeout']);
			}

			if ( ! $success)
			{
<<<<<<< HEAD
				log_message('error', 'Cache: Redis connection failed. Check your configuration.');
			}

			if (isset($config['password']) && ! $this->_redis->auth($config['password']))
			{
				log_message('error', 'Cache: Redis authentication failed.');
=======
				throw new RuntimeException('Cache: Redis connection failed. Check your configuration.');
>>>>>>> origin/master
			}
		}
		catch (RedisException $e)
		{
<<<<<<< HEAD
			log_message('error', 'Cache: Redis connection refused ('.$e->getMessage().')');
=======
			throw new RuntimeException('Cache: Redis connection refused ('.$e->getMessage().')');
		}

		if (isset($config['password']) && ! $this->_redis->auth($config['password']))
		{
			throw new RuntimeException('Cache: Redis authentication failed.');
>>>>>>> origin/master
		}

		// Initialize the index of serialized values.
		$serialized = $this->_redis->sMembers('_ci_redis_serialized');
		empty($serialized) OR $this->_serialized = array_flip($serialized);
	}

	// ------------------------------------------------------------------------

	/**
	 * Get cache
	 *
<<<<<<< HEAD
	 * @param	string	$key	Cache ID
=======
	 * @param	string	Cache ID
>>>>>>> origin/master
	 * @return	mixed
	 */
	public function get($key)
	{
		$value = $this->_redis->get($key);

		if ($value !== FALSE && isset($this->_serialized[$key]))
		{
			return unserialize($value);
		}

		return $value;
	}

	// ------------------------------------------------------------------------

	/**
	 * Save cache
	 *
	 * @param	string	$id	Cache ID
	 * @param	mixed	$data	Data to save
	 * @param	int	$ttl	Time to live in seconds
	 * @param	bool	$raw	Whether to store the raw value (unused)
	 * @return	bool	TRUE on success, FALSE on failure
	 */
	public function save($id, $data, $ttl = 60, $raw = FALSE)
	{
		if (is_array($data) OR is_object($data))
		{
			if ( ! $this->_redis->sIsMember('_ci_redis_serialized', $id) && ! $this->_redis->sAdd('_ci_redis_serialized', $id))
			{
				return FALSE;
			}

			isset($this->_serialized[$id]) OR $this->_serialized[$id] = TRUE;
			$data = serialize($data);
		}
		elseif (isset($this->_serialized[$id]))
		{
			$this->_serialized[$id] = NULL;
			$this->_redis->sRemove('_ci_redis_serialized', $id);
		}

		return $this->_redis->set($id, $data, $ttl);
	}

	// ------------------------------------------------------------------------

	/**
	 * Delete from cache
	 *
<<<<<<< HEAD
	 * @param	string	$key	Cache key
=======
	 * @param	string	Cache key
>>>>>>> origin/master
	 * @return	bool
	 */
	public function delete($key)
	{
		if ($this->_redis->delete($key) !== 1)
		{
			return FALSE;
		}

		if (isset($this->_serialized[$key]))
		{
			$this->_serialized[$key] = NULL;
			$this->_redis->sRemove('_ci_redis_serialized', $key);
		}

		return TRUE;
	}

	// ------------------------------------------------------------------------

	/**
	 * Increment a raw value
	 *
	 * @param	string	$id	Cache ID
	 * @param	int	$offset	Step/value to add
	 * @return	mixed	New value on success or FALSE on failure
	 */
	public function increment($id, $offset = 1)
	{
		return $this->_redis->incr($id, $offset);
	}

	// ------------------------------------------------------------------------

	/**
	 * Decrement a raw value
	 *
	 * @param	string	$id	Cache ID
	 * @param	int	$offset	Step/value to reduce by
	 * @return	mixed	New value on success or FALSE on failure
	 */
	public function decrement($id, $offset = 1)
	{
		return $this->_redis->decr($id, $offset);
	}

	// ------------------------------------------------------------------------

	/**
	 * Clean cache
	 *
	 * @return	bool
	 * @see		Redis::flushDB()
	 */
	public function clean()
	{
		return $this->_redis->flushDB();
	}

	// ------------------------------------------------------------------------

	/**
	 * Get cache driver info
	 *
<<<<<<< HEAD
	 * @param	string	$type	Not supported in Redis.
	 *				Only included in order to offer a
	 *				consistent cache API.
=======
	 * @param	string	Not supported in Redis.
	 *			Only included in order to offer a
	 *			consistent cache API.
>>>>>>> origin/master
	 * @return	array
	 * @see		Redis::info()
	 */
	public function cache_info($type = NULL)
	{
		return $this->_redis->info();
	}

	// ------------------------------------------------------------------------

	/**
	 * Get cache metadata
	 *
<<<<<<< HEAD
	 * @param	string	$key	Cache key
=======
	 * @param	string	Cache key
>>>>>>> origin/master
	 * @return	array
	 */
	public function get_metadata($key)
	{
		$value = $this->get($key);

		if ($value !== FALSE)
		{
			return array(
				'expire' => time() + $this->_redis->ttl($key),
				'data' => $value
			);
		}

		return FALSE;
	}

	// ------------------------------------------------------------------------

	/**
	 * Check if Redis driver is supported
	 *
	 * @return	bool
	 */
	public function is_supported()
	{
<<<<<<< HEAD
		return extension_loaded('redis');
=======
		if ( ! extension_loaded('redis'))
		{
			log_message('debug', 'The Redis extension must be loaded to use Redis cache.');
			return FALSE;
		}

		return TRUE;
>>>>>>> origin/master
	}

	// ------------------------------------------------------------------------

	/**
	 * Class destructor
	 *
	 * Closes the connection to Redis if present.
	 *
	 * @return	void
	 */
	public function __destruct()
	{
		if ($this->_redis)
		{
			$this->_redis->close();
		}
	}
}
