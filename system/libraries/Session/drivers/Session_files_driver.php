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
 * CodeIgniter Session Files Driver
 *
 * @package	CodeIgniter
 * @subpackage	Libraries
 * @category	Sessions
 * @author	Andrey Andreev
<<<<<<< HEAD
 * @link	https://codeigniter.com/user_guide/libraries/sessions.html
=======
 * @link	http://codeigniter.com/user_guide/libraries/sessions.html
>>>>>>> origin/master
 */
class CI_Session_files_driver extends CI_Session_driver implements SessionHandlerInterface {

	/**
	 * Save path
	 *
	 * @var	string
	 */
	protected $_save_path;

	/**
	 * File handle
	 *
	 * @var	resource
	 */
	protected $_file_handle;

	/**
	 * File name
	 *
	 * @var	resource
	 */
	protected $_file_path;

	/**
	 * File new flag
	 *
	 * @var	bool
	 */
	protected $_file_new;

<<<<<<< HEAD
	/**
	 * Validate SID regular expression
	 *
	 * @var	string
	 */
	protected $_sid_regexp;

	/**
	 * mbstring.func_overload flag
	 *
	 * @var	bool
	 */
	protected static $func_overload;

=======
>>>>>>> origin/master
	// ------------------------------------------------------------------------

	/**
	 * Class constructor
	 *
	 * @param	array	$params	Configuration parameters
	 * @return	void
	 */
	public function __construct(&$params)
	{
		parent::__construct($params);

		if (isset($this->_config['save_path']))
		{
			$this->_config['save_path'] = rtrim($this->_config['save_path'], '/\\');
			ini_set('session.save_path', $this->_config['save_path']);
		}
		else
		{
<<<<<<< HEAD
			log_message('debug', 'Session: "sess_save_path" is empty; using "session.save_path" value from php.ini.');
			$this->_config['save_path'] = rtrim(ini_get('session.save_path'), '/\\');
		}

		$this->_sid_regexp = $this->_config['_sid_regexp'];

		isset(self::$func_overload) OR self::$func_overload = (extension_loaded('mbstring') && ini_get('mbstring.func_overload'));
=======
			$this->_config['save_path'] = rtrim(ini_get('session.save_path'), '/\\');
		}
>>>>>>> origin/master
	}

	// ------------------------------------------------------------------------

	/**
	 * Open
	 *
	 * Sanitizes the save_path directory.
	 *
	 * @param	string	$save_path	Path to session files' directory
	 * @param	string	$name		Session cookie name
	 * @return	bool
	 */
	public function open($save_path, $name)
	{
		if ( ! is_dir($save_path))
		{
			if ( ! mkdir($save_path, 0700, TRUE))
			{
				throw new Exception("Session: Configured save path '".$this->_config['save_path']."' is not a directory, doesn't exist or cannot be created.");
			}
		}
		elseif ( ! is_writable($save_path))
		{
			throw new Exception("Session: Configured save path '".$this->_config['save_path']."' is not writable by the PHP process.");
		}

		$this->_config['save_path'] = $save_path;
		$this->_file_path = $this->_config['save_path'].DIRECTORY_SEPARATOR
			.$name // we'll use the session cookie name as a prefix to avoid collisions
			.($this->_config['match_ip'] ? md5($_SERVER['REMOTE_ADDR']) : '');

<<<<<<< HEAD
		return $this->_success;
=======
		return TRUE;
>>>>>>> origin/master
	}

	// ------------------------------------------------------------------------

	/**
	 * Read
	 *
	 * Reads session data and acquires a lock
	 *
	 * @param	string	$session_id	Session ID
	 * @return	string	Serialized session data
	 */
	public function read($session_id)
	{
		// This might seem weird, but PHP 5.6 introduces session_reset(),
		// which re-reads session data
		if ($this->_file_handle === NULL)
		{
<<<<<<< HEAD
			$this->_file_new = ! file_exists($this->_file_path.$session_id);

			if (($this->_file_handle = fopen($this->_file_path.$session_id, 'c+b')) === FALSE)
			{
				log_message('error', "Session: Unable to open file '".$this->_file_path.$session_id."'.");
				return $this->_failure;
=======
			// Just using fopen() with 'c+b' mode would be perfect, but it is only
			// available since PHP 5.2.6 and we have to set permissions for new files,
			// so we'd have to hack around this ...
			if (($this->_file_new = ! file_exists($this->_file_path.$session_id)) === TRUE)
			{
				if (($this->_file_handle = fopen($this->_file_path.$session_id, 'w+b')) === FALSE)
				{
					log_message('error', "Session: File '".$this->_file_path.$session_id."' doesn't exist and cannot be created.");
					return FALSE;
				}
			}
			elseif (($this->_file_handle = fopen($this->_file_path.$session_id, 'r+b')) === FALSE)
			{
				log_message('error', "Session: Unable to open file '".$this->_file_path.$session_id."'.");
				return FALSE;
>>>>>>> origin/master
			}

			if (flock($this->_file_handle, LOCK_EX) === FALSE)
			{
				log_message('error', "Session: Unable to obtain lock for file '".$this->_file_path.$session_id."'.");
				fclose($this->_file_handle);
				$this->_file_handle = NULL;
<<<<<<< HEAD
				return $this->_failure;
=======
				return FALSE;
>>>>>>> origin/master
			}

			// Needed by write() to detect session_regenerate_id() calls
			$this->_session_id = $session_id;

			if ($this->_file_new)
			{
				chmod($this->_file_path.$session_id, 0600);
				$this->_fingerprint = md5('');
				return '';
			}
		}
<<<<<<< HEAD
		// We shouldn't need this, but apparently we do ...
		// See https://github.com/bcit-ci/CodeIgniter/issues/4039
		elseif ($this->_file_handle === FALSE)
		{
			return $this->_failure;
		}
=======
>>>>>>> origin/master
		else
		{
			rewind($this->_file_handle);
		}

		$session_data = '';
<<<<<<< HEAD
		for ($read = 0, $length = filesize($this->_file_path.$session_id); $read < $length; $read += self::strlen($buffer))
=======
		for ($read = 0, $length = filesize($this->_file_path.$session_id); $read < $length; $read += strlen($buffer))
>>>>>>> origin/master
		{
			if (($buffer = fread($this->_file_handle, $length - $read)) === FALSE)
			{
				break;
			}

			$session_data .= $buffer;
		}

		$this->_fingerprint = md5($session_data);
		return $session_data;
	}

	// ------------------------------------------------------------------------

	/**
	 * Write
	 *
	 * Writes (create / update) session data
	 *
	 * @param	string	$session_id	Session ID
	 * @param	string	$session_data	Serialized session data
	 * @return	bool
	 */
	public function write($session_id, $session_data)
	{
		// If the two IDs don't match, we have a session_regenerate_id() call
		// and we need to close the old handle and open a new one
<<<<<<< HEAD
		if ($session_id !== $this->_session_id && ($this->close() === $this->_failure OR $this->read($session_id) === $this->_failure))
		{
			return $this->_failure;
=======
		if ($session_id !== $this->_session_id && ( ! $this->close() OR $this->read($session_id) === FALSE))
		{
			return FALSE;
>>>>>>> origin/master
		}

		if ( ! is_resource($this->_file_handle))
		{
<<<<<<< HEAD
			return $this->_failure;
		}
		elseif ($this->_fingerprint === md5($session_data))
		{
			return ( ! $this->_file_new && ! touch($this->_file_path.$session_id))
				? $this->_failure
				: $this->_success;
=======
			return FALSE;
		}
		elseif ($this->_fingerprint === md5($session_data))
		{
			return ($this->_file_new)
				? TRUE
				: touch($this->_file_path.$session_id);
>>>>>>> origin/master
		}

		if ( ! $this->_file_new)
		{
			ftruncate($this->_file_handle, 0);
			rewind($this->_file_handle);
		}

		if (($length = strlen($session_data)) > 0)
		{
			for ($written = 0; $written < $length; $written += $result)
			{
				if (($result = fwrite($this->_file_handle, substr($session_data, $written))) === FALSE)
				{
					break;
				}
			}

			if ( ! is_int($result))
			{
				$this->_fingerprint = md5(substr($session_data, 0, $written));
				log_message('error', 'Session: Unable to write data.');
<<<<<<< HEAD
				return $this->_failure;
=======
				return FALSE;
>>>>>>> origin/master
			}
		}

		$this->_fingerprint = md5($session_data);
<<<<<<< HEAD
		return $this->_success;
=======
		return TRUE;
>>>>>>> origin/master
	}

	// ------------------------------------------------------------------------

	/**
	 * Close
	 *
	 * Releases locks and closes file descriptor.
	 *
	 * @return	bool
	 */
	public function close()
	{
		if (is_resource($this->_file_handle))
		{
			flock($this->_file_handle, LOCK_UN);
			fclose($this->_file_handle);

			$this->_file_handle = $this->_file_new = $this->_session_id = NULL;
<<<<<<< HEAD
		}

		return $this->_success;
=======
			return TRUE;
		}

		return TRUE;
>>>>>>> origin/master
	}

	// ------------------------------------------------------------------------

	/**
	 * Destroy
	 *
	 * Destroys the current session.
	 *
	 * @param	string	$session_id	Session ID
	 * @return	bool
	 */
	public function destroy($session_id)
	{
<<<<<<< HEAD
		if ($this->close() === $this->_success)
		{
			if (file_exists($this->_file_path.$session_id))
			{
				$this->_cookie_destroy();
				return unlink($this->_file_path.$session_id)
					? $this->_success
					: $this->_failure;
			}

			return $this->_success;
=======
		if ($this->close())
		{
			return file_exists($this->_file_path.$session_id)
				? (unlink($this->_file_path.$session_id) && $this->_cookie_destroy())
				: TRUE;
>>>>>>> origin/master
		}
		elseif ($this->_file_path !== NULL)
		{
			clearstatcache();
<<<<<<< HEAD
			if (file_exists($this->_file_path.$session_id))
			{
				$this->_cookie_destroy();
				return unlink($this->_file_path.$session_id)
					? $this->_success
					: $this->_failure;
			}

			return $this->_success;
		}

		return $this->_failure;
=======
			return file_exists($this->_file_path.$session_id)
				? (unlink($this->_file_path.$session_id) && $this->_cookie_destroy())
				: TRUE;
		}

		return FALSE;
>>>>>>> origin/master
	}

	// ------------------------------------------------------------------------

	/**
	 * Garbage Collector
	 *
	 * Deletes expired sessions
	 *
	 * @param	int 	$maxlifetime	Maximum lifetime of sessions
	 * @return	bool
	 */
	public function gc($maxlifetime)
	{
		if ( ! is_dir($this->_config['save_path']) OR ($directory = opendir($this->_config['save_path'])) === FALSE)
		{
			log_message('debug', "Session: Garbage collector couldn't list files under directory '".$this->_config['save_path']."'.");
<<<<<<< HEAD
			return $this->_failure;
=======
			return FALSE;
>>>>>>> origin/master
		}

		$ts = time() - $maxlifetime;

<<<<<<< HEAD
		$pattern = ($this->_config['match_ip'] === TRUE)
			? '[0-9a-f]{32}'
			: '';

		$pattern = sprintf(
			'#\A%s'.$pattern.$this->_sid_regexp.'\z#',
			preg_quote($this->_config['cookie_name'])
=======
		$pattern = sprintf(
			'/^%s[0-9a-f]{%d}$/',
			preg_quote($this->_config['cookie_name'], '/'),
			($this->_config['match_ip'] === TRUE ? 72 : 40)
>>>>>>> origin/master
		);

		while (($file = readdir($directory)) !== FALSE)
		{
			// If the filename doesn't match this pattern, it's either not a session file or is not ours
			if ( ! preg_match($pattern, $file)
				OR ! is_file($this->_config['save_path'].DIRECTORY_SEPARATOR.$file)
				OR ($mtime = filemtime($this->_config['save_path'].DIRECTORY_SEPARATOR.$file)) === FALSE
				OR $mtime > $ts)
			{
				continue;
			}

			unlink($this->_config['save_path'].DIRECTORY_SEPARATOR.$file);
		}

		closedir($directory);

<<<<<<< HEAD
		return $this->_success;
	}

	// --------------------------------------------------------------------

	/**
	 * Byte-safe strlen()
	 *
	 * @param	string	$str
	 * @return	int
	 */
	protected static function strlen($str)
	{
		return (self::$func_overload)
			? mb_strlen($str, '8bit')
			: strlen($str);
	}
=======
		return TRUE;
	}

>>>>>>> origin/master
}
